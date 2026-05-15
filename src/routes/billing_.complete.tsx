import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export const Route = createFileRoute("/billing_/complete")({
	component: BillingCompletePage,
});

function BillingCompletePage() {
	return (
		<AppShell>
			<PageHeader
				description="Dodo will confirm the subscription through the Convex webhook."
				title="Checkout complete"
			/>
			<Card>
				<CardContent className="grid gap-4 p-6">
					<p className="text-muted-foreground">
						Your checkout finished. The account unlocks when the payment webhook
						updates your subscription.
					</p>
					<div>
						<Button asChild>
							<Link to="/dashboard">Back to dashboard</Link>
						</Button>
					</div>
				</CardContent>
			</Card>
		</AppShell>
	)
}
