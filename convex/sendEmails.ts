import { Resend } from "@convex-dev/resend";
import { v } from "convex/values";
import { render } from "react-email";
import { components, internal } from "./_generated/api";
import { internalAction } from "./_generated/server";
import { ActivationEmail } from "./emails/ActivationEmail";

export const resend: Resend = new Resend(components.resend, {
	testMode: false,
});

function getAppUrl(appUrl?: string) {
	return (
		appUrl ??
		process.env.APP_URL ??
		process.env.CONVEX_SITE_URL ??
		"http://localhost:3000"
	);
}

function getFromAddress() {
	const from = process.env.RESEND_FROM_EMAIL;
	if (!from) {
		throw new Error("Missing RESEND_FROM_EMAIL");
	}

	return from;
}

function getAppName() {
	return process.env.APP_NAME ?? "Starter App";
}

export const sendSubscriptionActivationEmail = internalAction({
	args: {
		to: v.string(),
		username: v.optional(v.string()),
		planName: v.string(),
		subscriptionId: v.id("subscriptions"),
		appUrl: v.optional(v.string()),
	},
	handler: async (ctx, args) => {
		const html = await render(
			ActivationEmail({
				appName: getAppName(),
				username: args.username,
				planName: args.planName,
				appUrl: getAppUrl(args.appUrl),
			}),
		);

		await resend.sendEmail(ctx, {
			from: getFromAddress(),
			to: args.to,
			subject: `Your ${args.planName} plan is active`,
			html,
		});

		await ctx.runMutation(internal.billing.markActivationEmailSent, {
			subscriptionId: args.subscriptionId,
		});
	},
});
