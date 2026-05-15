import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery } from "convex/react";
import type { FormEvent } from "react";
import { useEffect, useState } from "react";
import { AppShell } from "@/components/app-shell";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { settingsFormSchema } from "@/lib/validation";
import { api } from "../../convex/_generated/api";

export const Route = createFileRoute("/settings")({
	component: SettingsPage,
});

function SettingsPage() {
	const settings = useQuery(api.settings.get, {});
	const saveSettings = useMutation(api.settings.save);
	const [name, setName] = useState("");
	const [timezone, setTimezone] = useState("UTC");
	const [error, setError] = useState<string | null>(null);
	const [isSaving, setIsSaving] = useState(false);

	useEffect(() => {
		if (!settings) {
			return;
		}

		setName(settings.name ?? "");
		setTimezone(settings.timezone ?? "UTC");
	}, [settings]);

	async function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		setError(null);
		const parsed = settingsFormSchema.safeParse({ name, timezone });
		if (!parsed.success) {
			setError("Enter a name and timezone.");
			return;
		}

		setIsSaving(true);
		try {
			await saveSettings(parsed.data);
		} finally {
			setIsSaving(false);
		}
	}

	return (
		<AppShell>
			<PageHeader
				description="A starter account settings form backed by Convex and Zod validation."
				title="Settings"
			/>
			<Card className="max-w-2xl">
				<CardContent className="p-6">
					<form className="grid gap-5" onSubmit={handleSubmit}>
						{error ? <p className="text-destructive text-sm">{error}</p> : null}
						<div className="grid gap-2">
							<Label>Name</Label>
							<Input
								onChange={(event) => setName(event.target.value)}
								value={name}
							/>
						</div>
						<div className="grid gap-2">
							<Label>Timezone</Label>
							<Input
								onChange={(event) => setTimezone(event.target.value)}
								value={timezone}
							/>
						</div>
						<div>
							<Button disabled={isSaving} type="submit">
								{isSaving ? "Saving..." : "Save settings"}
							</Button>
						</div>
					</form>
				</CardContent>
			</Card>
		</AppShell>
	);
}
