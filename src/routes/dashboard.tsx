import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "convex/react";
import { Activity, CreditCard, Users } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { PageHeader } from "@/components/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { api } from "../../convex/_generated/api";

export const Route = createFileRoute("/dashboard")({
	component: DashboardPage,
});

function DashboardPage() {
	const viewer = useQuery(api.viewer.get, {});
	const billing = useQuery(api.billing.getCurrent, {});

	return (
		<AppShell>
			<PageHeader
				description="A small authenticated surface you can replace with your product workflow."
				title={`Welcome${viewer?.name ? `, ${viewer.name}` : ""}`}
			/>
			<div className="grid gap-4 md:grid-cols-3">
				<MetricCard
					icon={Users}
					label="Seats"
					value={`${billing?.plan?.seatLimit ?? 0}`}
				/>
				<MetricCard
					icon={Activity}
					label="Monthly actions"
					value={`${billing?.plan?.monthlyActionLimit ?? 0}`}
				/>
				<MetricCard
					icon={CreditCard}
					label="Plan"
					value={billing?.plan?.label ?? "Free"}
				/>
			</div>
			<Card className="mt-6">
				<CardHeader>
					<CardTitle>Next product step</CardTitle>
				</CardHeader>
				<CardContent className="text-muted-foreground">
					Replace this card with your first core workflow. Keep auth, billing,
					settings, and deployment as the reusable foundation.
				</CardContent>
			</Card>
		</AppShell>
	);
}

function MetricCard({
	icon: Icon,
	label,
	value,
}: {
	icon: typeof Users;
	label: string;
	value: string;
}) {
	return (
		<Card>
			<CardContent className="flex items-center justify-between p-6">
				<div>
					<p className="text-muted-foreground text-sm">{label}</p>
					<p className="mt-2 font-bold text-2xl">{value}</p>
				</div>
				<div className="grid size-11 place-items-center rounded-lg bg-accent text-accent-foreground">
					<Icon className="size-5" />
				</div>
			</CardContent>
		</Card>
	);
}
