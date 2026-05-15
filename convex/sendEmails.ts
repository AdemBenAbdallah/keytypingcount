import { Resend } from "@convex-dev/resend";
import { v } from "convex/values";
import { render } from "react-email";
import { components } from "./_generated/api";
import { internalAction } from "./_generated/server";
import { WelcomeEmail } from "./emails/WelcomeEmail";

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
	return process.env.APP_NAME ?? "Your App";
}

export const sendWelcomeEmail = internalAction({
	args: {
		to: v.string(),
		name: v.optional(v.string()),
		message: v.optional(v.string()),
		appUrl: v.optional(v.string()),
	},
	handler: async (ctx, args) => {
		const html = await render(
			WelcomeEmail({
				appName: getAppName(),
				name: args.name,
				message: args.message,
				appUrl: getAppUrl(args.appUrl),
			}),
		);

		await resend.sendEmail(ctx, {
			from: getFromAddress(),
			to: args.to,
			subject: `Welcome to ${getAppName()}`,
			html,
		});
	},
});
