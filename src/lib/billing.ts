export type PlanKey = "starter" | "pro";

export type BillingPlan = {
	key: PlanKey;
	label: string;
	price: string;
	description: string;
	features: string[];
	productIdEnv: string;
	seatLimit: number;
	monthlyActionLimit: number;
	highlight?: string;
};

export const billingPlans: Record<PlanKey, BillingPlan> = {
	starter: {
		key: "starter",
		label: "Starter",
		price: "$9/month",
		description: "For validating a focused product with real users.",
		features: ["1 workspace", "Core dashboard", "Email support"],
		productIdEnv: "DODO_PAYMENTS_STARTER_PRODUCT_ID",
		seatLimit: 1,
		monthlyActionLimit: 1000,
	},
	pro: {
		key: "pro",
		label: "Pro",
		price: "$29/month",
		description: "For active products that need room to grow.",
		features: ["5 seats", "Higher usage limits", "Priority support"],
		productIdEnv: "DODO_PAYMENTS_PRO_PRODUCT_ID",
		seatLimit: 5,
		monthlyActionLimit: 10000,
		highlight: "Popular",
	},
};

export function getBillingPlan(planKey: PlanKey) {
	return billingPlans[planKey];
}

export function getBillingPlans() {
	return Object.values(billingPlans);
}
