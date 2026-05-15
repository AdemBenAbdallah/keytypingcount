import { getAuthUserId } from "@convex-dev/auth/server";
import { v } from "convex/values";
import {
	type MutationCtx,
	mutation,
	type QueryCtx,
	query,
} from "./_generated/server";

async function requireUserId(ctx: QueryCtx | MutationCtx) {
	const userId = await getAuthUserId(ctx);
	if (!userId) {
		throw new Error("Unauthenticated");
	}
	return userId;
}

export const get = query({
	args: {},
	handler: async (ctx) => {
		const userId = await getAuthUserId(ctx);
		if (!userId) {
			return null;
		}

		return await ctx.db
			.query("settings")
			.withIndex("by_userId", (q) => q.eq("userId", userId))
			.unique();
	},
});

export const save = mutation({
	args: {
		name: v.string(),
		timezone: v.string(),
	},
	handler: async (ctx, args) => {
		const userId = await requireUserId(ctx);
		const timestamp = Date.now();
		const user = await ctx.db.get(userId);
		const existing = await ctx.db
			.query("settings")
			.withIndex("by_userId", (q) => q.eq("userId", userId))
			.unique();

		const patch = {
			userId,
			name: args.name,
			email: user?.email,
			timezone: args.timezone,
			updatedAt: timestamp,
		};

		if (existing) {
			await ctx.db.patch(existing._id, patch);
			return existing._id;
		}

		return await ctx.db.insert("settings", {
			...patch,
			createdAt: timestamp,
		});
	},
});
