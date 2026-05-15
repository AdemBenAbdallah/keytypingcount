import { authTables } from "@convex-dev/auth/server";
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export const planKey = v.union(v.literal("starter"), v.literal("pro"));

export const subscriptionStatus = v.union(
	v.literal("pending"),
	v.literal("active"),
	v.literal("on_hold"),
	v.literal("cancelled"),
	v.literal("failed"),
	v.literal("expired"),
);

export default defineSchema({
	...authTables,
	settings: defineTable({
		userId: v.string(),
		name: v.optional(v.string()),
		email: v.optional(v.string()),
		timezone: v.string(),
		createdAt: v.number(),
		updatedAt: v.number(),
	}).index("by_userId", ["userId"]),
	subscriptions: defineTable({
		userId: v.string(),
		planKey,
		status: subscriptionStatus,
		dodoCustomerId: v.optional(v.string()),
		dodoSubscriptionId: v.optional(v.string()),
		checkoutSessionId: v.optional(v.string()),
		activatedAt: v.optional(v.number()),
		cancelledAt: v.optional(v.number()),
		expiresAt: v.optional(v.number()),
		lastWebhookAt: v.optional(v.number()),
		createdAt: v.number(),
		updatedAt: v.number(),
	})
		.index("by_userId", ["userId"])
		.index("by_dodoCustomerId", ["dodoCustomerId"])
		.index("by_dodoSubscriptionId", ["dodoSubscriptionId"]),
});
