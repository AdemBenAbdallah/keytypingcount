import { getAuthUserId } from "@convex-dev/auth/server";
import { v } from "convex/values";
import DodoPayments from "dodopayments";
import { billingPlans, getBillingPlan, type PlanKey } from "../src/lib/billing";
import { api, internal } from "./_generated/api";
import type { Doc, Id } from "./_generated/dataModel";
import {
	type ActionCtx,
	action,
	internalMutation,
	type MutationCtx,
	type QueryCtx,
	query,
} from "./_generated/server";

type SubscriptionDoc = Doc<"subscriptions">;
type ReadCtx = Pick<QueryCtx, "db"> | Pick<MutationCtx, "db">;

async function requireUserId(ctx: QueryCtx | ActionCtx) {
	const userId = await getAuthUserId(ctx);
	if (!userId) {
		throw new Error("Unauthenticated");
	}
	return userId;
}

async function getSubscription(ctx: ReadCtx, userId: string) {
	return await ctx.db
		.query("subscriptions")
		.withIndex("by_userId", (q) => q.eq("userId", userId))
		.unique();
}

function cleanEnvValue(value: string | undefined) {
	return value?.trim().replace(/^['"]|['"]$/g, "");
}

function getDodoEnvironment() {
	return cleanEnvValue(process.env.DODO_PAYMENTS_ENVIRONMENT) === "test_mode"
		? "test_mode"
		: "live_mode";
}

function getProductId(planKey: PlanKey) {
	const envName = billingPlans[planKey].productIdEnv;
	const productId = cleanEnvValue(process.env[envName]);
	if (!productId) {
		throw new Error(`Missing ${envName}`);
	}
	return productId;
}

function toTimestamp(value: string | undefined | null) {
	if (!value) {
		return undefined;
	}

	const timestamp = Date.parse(value);
	return Number.isNaN(timestamp) ? undefined : timestamp;
}

function isActive(subscription: SubscriptionDoc | null) {
	return subscription?.status === "active";
}

type SubscriptionWebhookData = {
	payload_type: "Subscription";
	subscription_id: string;
	customer: {
		customer_id: string;
		email: string;
		name: string;
		metadata: Record<string, unknown>;
	};
	metadata: Record<string, string>;
	product_id: string;
	status: SubscriptionDoc["status"];
	expires_at?: string | null;
	cancelled_at?: string | null;
};

type PaymentWebhookData = {
	payload_type: "Payment";
	customer: {
		customer_id: string;
		email: string;
		name: string;
		metadata: Record<string, unknown>;
	};
	metadata: Record<string, string>;
	product_cart: Array<{ product_id: string; quantity: number }> | null;
	subscription_id: string | null;
	status: string | null;
};

type WebhookPayloadLike = {
	type: string;
	timestamp: string;
	data: SubscriptionWebhookData | PaymentWebhookData | { payload_type: string };
};

function isSubscriptionWebhookData(
	data: WebhookPayloadLike["data"],
): data is SubscriptionWebhookData {
	return data.payload_type === "Subscription";
}

function isPaymentWebhookData(
	data: WebhookPayloadLike["data"],
): data is PaymentWebhookData {
	return data.payload_type === "Payment";
}

function getWebhookMetadata(payload: WebhookPayloadLike) {
	if (
		isSubscriptionWebhookData(payload.data) ||
		isPaymentWebhookData(payload.data)
	) {
		return payload.data.metadata;
	}

	return {};
}

function getStringField(record: Record<string, unknown>, key: string) {
	const value = record[key];
	return typeof value === "string" ? value : null;
}

function getUserIdFromWebhook(payload: WebhookPayloadLike) {
	const metadata = getWebhookMetadata(payload);
	if (metadata.userId) {
		return metadata.userId;
	}

	if (
		isSubscriptionWebhookData(payload.data) ||
		isPaymentWebhookData(payload.data)
	) {
		return getStringField(payload.data.customer.metadata, "userId");
	}

	return null;
}

function getPlanKeyFromWebhook(payload: WebhookPayloadLike): PlanKey | null {
	const metadata = getWebhookMetadata(payload);
	if (metadata.planKey === "starter" || metadata.planKey === "pro") {
		return metadata.planKey;
	}

	const data = payload.data;
	const productId = isSubscriptionWebhookData(data)
		? data.product_id
		: isPaymentWebhookData(data)
			? (data.product_cart?.[0]?.product_id ?? null)
			: null;

	if (productId === process.env.DODO_PAYMENTS_STARTER_PRODUCT_ID) {
		return "starter";
	}

	if (productId === process.env.DODO_PAYMENTS_PRO_PRODUCT_ID) {
		return "pro";
	}

	return null;
}

function getSubscriptionStatus(payload: WebhookPayloadLike) {
	if (
		payload.type === "subscription.active" ||
		payload.type === "subscription.renewed" ||
		payload.type === "subscription.plan_changed" ||
		payload.type === "subscription.updated"
	) {
		return "active" as const;
	}

	if (payload.type === "subscription.on_hold") {
		return "on_hold" as const;
	}

	if (payload.type === "subscription.cancelled") {
		return "cancelled" as const;
	}

	if (payload.type === "subscription.failed") {
		return "failed" as const;
	}

	if (payload.type === "subscription.expired") {
		return "expired" as const;
	}

	return null;
}

export const getCurrent = query({
	args: {},
	handler: async (ctx) => {
		const userId = await requireUserId(ctx);
		const subscription = await getSubscription(ctx, userId);
		const plan = subscription ? getBillingPlan(subscription.planKey) : null;

		return {
			userId,
			subscription,
			planKey: subscription?.planKey ?? null,
			plan,
			isActive: isActive(subscription),
			isPending: subscription?.status === "pending",
			customerId: subscription?.dodoCustomerId ?? null,
			subscriptionId: subscription?.dodoSubscriptionId ?? null,
		};
	},
});

export const startCheckout = action({
	args: {
		planKey: v.union(v.literal("starter"), v.literal("pro")),
		returnUrl: v.string(),
	},
	handler: async (ctx, args) => {
		const userId = await requireUserId(ctx);
		const identity = await ctx.auth.getUserIdentity();
		const checkoutContext: {
			authUser: Doc<"users"> | null;
			subscription: SubscriptionDoc | null;
		} = await ctx.runQuery(api.billing.getCheckoutContext, {});
		const userEmail = identity?.email || checkoutContext.authUser?.email || "";
		if (!userEmail) {
			throw new Error("Missing account email");
		}

		const apiKey = cleanEnvValue(process.env.DODO_PAYMENTS_API_KEY);
		if (!apiKey) {
			throw new Error("Missing DODO_PAYMENTS_API_KEY");
		}

		const returnUrl = new URL(args.returnUrl);
		if (!["http:", "https:"].includes(returnUrl.protocol)) {
			throw new Error("Invalid return URL");
		}

		const client = new DodoPayments({
			bearerToken: apiKey,
			environment: getDodoEnvironment(),
		});
		const checkout = await client.checkoutSessions.create({
			product_cart: [{ product_id: getProductId(args.planKey), quantity: 1 }],
			customer: {
				email: userEmail,
				name:
					identity?.name ||
					checkoutContext.authUser?.name ||
					userEmail.split("@")[0] ||
					"User",
			},
			metadata: { userId, planKey: args.planKey },
			return_url: returnUrl.toString(),
		});

		if (!checkout.checkout_url) {
			throw new Error("Dodo checkout session did not return a URL");
		}

		await ctx.runMutation(internal.billing.markCheckoutStarted, {
			userId,
			planKey: args.planKey,
			checkoutSessionId: checkout.session_id,
			dodoCustomerId: checkoutContext.subscription?.dodoCustomerId ?? undefined,
		});

		return { checkoutUrl: checkout.checkout_url };
	},
});

export const createCustomerPortalSession = action({
	args: {},
	handler: async (ctx) => {
		const checkoutContext: { subscription: SubscriptionDoc | null } =
			await ctx.runQuery(api.billing.getCheckoutContext, {});
		const customerId = checkoutContext.subscription?.dodoCustomerId;
		if (!customerId) {
			throw new Error("Missing Dodo customer ID");
		}

		const apiKey = cleanEnvValue(process.env.DODO_PAYMENTS_API_KEY);
		if (!apiKey) {
			throw new Error("Missing DODO_PAYMENTS_API_KEY");
		}

		const client = new DodoPayments({
			bearerToken: apiKey,
			environment: getDodoEnvironment(),
		});
		const session = await client.customers.customerPortal.create(customerId);
		if (!session.link) {
			throw new Error("Dodo customer portal session did not return a link");
		}

		return { link: session.link };
	},
});

export const getCheckoutContext = query({
	args: {},
	handler: async (ctx) => {
		const userId = await requireUserId(ctx);
		const [authUser, subscription] = await Promise.all([
			ctx.db.get(userId as Id<"users">),
			getSubscription(ctx, userId),
		]);

		return { authUser, subscription };
	},
});

export const markCheckoutStarted = internalMutation({
	args: {
		userId: v.string(),
		planKey: v.union(v.literal("starter"), v.literal("pro")),
		checkoutSessionId: v.string(),
		dodoCustomerId: v.optional(v.string()),
	},
	handler: async (ctx, args) => {
		const timestamp = Date.now();
		const existing = await getSubscription(ctx, args.userId);
		const patch = {
			userId: args.userId,
			planKey: args.planKey,
			status: "pending" as const,
			checkoutSessionId: args.checkoutSessionId,
			dodoCustomerId: args.dodoCustomerId,
			updatedAt: timestamp,
		};

		if (existing) {
			await ctx.db.patch(existing._id, patch);
			return existing._id;
		}

		return await ctx.db.insert("subscriptions", {
			...patch,
			createdAt: timestamp,
		});
	},
});

export const applyWebhookEvent = internalMutation({
	args: { payload: v.any() },
	handler: async (ctx, args) => {
		const payload = args.payload as WebhookPayloadLike;
		const userId = getUserIdFromWebhook(payload);
		const planKey = getPlanKeyFromWebhook(payload);
		const status = getSubscriptionStatus(payload);

		if (!userId || !planKey || !status) {
			return null;
		}

		const timestamp = Date.now();
		const data = payload.data;
		const dodoCustomerId =
			isSubscriptionWebhookData(data) || isPaymentWebhookData(data)
				? data.customer.customer_id
				: undefined;
		const dodoSubscriptionId = isSubscriptionWebhookData(data)
			? data.subscription_id
			: isPaymentWebhookData(data)
				? (data.subscription_id ?? undefined)
				: undefined;
		const existing = await getSubscription(ctx, userId);
		const patch = {
			userId,
			planKey,
			status,
			dodoCustomerId,
			dodoSubscriptionId,
			activatedAt: status === "active" ? timestamp : existing?.activatedAt,
			cancelledAt: isSubscriptionWebhookData(data)
				? toTimestamp(data.cancelled_at)
				: existing?.cancelledAt,
			expiresAt: isSubscriptionWebhookData(data)
				? toTimestamp(data.expires_at)
				: existing?.expiresAt,
			lastWebhookAt: timestamp,
			updatedAt: timestamp,
		};

		let subscriptionId = existing?._id;
		if (existing) {
			await ctx.db.patch(existing._id, patch);
		} else {
			subscriptionId = await ctx.db.insert("subscriptions", {
				...patch,
				createdAt: timestamp,
			});
		}

		return subscriptionId ?? null;
	},
});
