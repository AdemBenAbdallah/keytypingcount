import { createFileRoute } from "@tanstack/react-router";
import { useAction, useQuery } from "convex/react";
import { Check, ExternalLink } from "lucide-react";
import { useState } from "react";
import { AppShell } from "@/components/app-shell";
import { PageHeader } from "@/components/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getBillingPlans, type PlanKey } from "@/lib/billing";
import { api } from "../../convex/_generated/api";

export const Route = createFileRoute("/billing")({
	component: BillingPage,
});

function BillingPage() {
	const billing = useQuery(api.billing.getCurrent, {});
	const startCheckout = useAction(api.billing.startCheckout);
	const createPortal = useAction(api.billing.createCustomerPortalSession);
	const [loadingPlan, setLoadingPlan] = useState<PlanKey | null>(null);
	const [isPortalLoading, setIsPortalLoading] = useState(false);

	async function handleCheckout(planKey: PlanKey) {
		setLoadingPlan(planKey);
		try {
			const result = await startCheckout({
				planKey,
				returnUrl: `${window.location.origin}/billing/complete`,
			});
			window.location.href = result.checkoutUrl;
		} finally {
			setLoadingPlan(null);
		}
	}

	async function handlePortal() {
		setIsPortalLoading(true);
		try {
			const result = await createPortal({});
			window.location.href = result.link;
		} finally {
			setIsPortalLoading(false);
		}
	}

	return (
		<AppShell>
			<PageHeader
				actions={
					billing?.customerId ? (
						<Button
							disabled={isPortalLoading}
							onClick={() => void handlePortal()}
							variant="outline"
						>
							<ExternalLink className="size-4" />
							Manage billing
						</Button>
					) : null
				}
				description="Dodo Payments checkout and customer portal are wired into Convex actions."
				title="Billing"
			/>
			<div className="grid gap-4 md:grid-cols-2">
				{getBillingPlans().map((plan) => (
					<Card className="relative" key={plan.key}>
						<CardHeader>
							<div className="flex items-start justify-between gap-3">
								<div>
									<CardTitle>{plan.label}</CardTitle>
									<p className="mt-2 font-bold text-3xl">{plan.price}</p>
								</div>
								{plan.highlight ? <Badge>{plan.highlight}</Badge> : null}
							</div>
							<p className="text-muted-foreground">{plan.description}</p>
						</CardHeader>
						<CardContent>
							<ul className="mb-6 grid gap-3">
								{plan.features.map((feature) => (
									<li className="flex items-center gap-3" key={feature}>
										<Check className="size-4 text-primary" />
										<span>{feature}</span>
									</li>
								))}
							</ul>
							<Button
								className="w-full"
								disabled={
									loadingPlan === plan.key || billing?.planKey === plan.key
								}
								onClick={() => void handleCheckout(plan.key)}
								type="button"
							>
								{billing?.planKey === plan.key
									? "Current plan"
									: loadingPlan === plan.key
										? "Opening..."
										: "Start checkout"}
							</Button>
						</CardContent>
					</Card>
				))}
			</div>
		</AppShell>
	);
}
