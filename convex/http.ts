import { httpRouter } from "convex/server";
import DodoPayments from "dodopayments";
import { internal } from "./_generated/api";
import { httpAction } from "./_generated/server";
import { auth } from "./auth";

const http = httpRouter();

auth.addHttpRoutes(http);

http.route({
	path: "/api/webhooks/dodo-payments",
	method: "POST",
	handler: httpAction(async (ctx, request) => {
		const webhookKey = process.env.DODO_PAYMENTS_WEBHOOK_KEY;
		if (!webhookKey) {
			return new Response("Missing DODO_PAYMENTS_WEBHOOK_KEY", { status: 500 });
		}

		const body = await request.text();
		const headers: Record<string, string> = {};
		request.headers.forEach((value, key) => {
			headers[key] = value;
		});

		const client = new DodoPayments({ webhookKey });
		let payload: unknown;
		try {
			payload = client.webhooks.unwrap(body, { headers, key: webhookKey });
		} catch (caught) {
			const message = caught instanceof Error ? caught.message : String(caught);
			const status = message.toLowerCase().includes("signature") ? 401 : 400;
			return new Response(message || "Invalid webhook", { status });
		}

		await ctx.runMutation(internal.billing.applyWebhookEvent, { payload });
		return new Response("ok", { status: 200 });
	}),
});

export default http;
