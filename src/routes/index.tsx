import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { BrandLogo } from "@/components/brand-logo";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { appConfig } from "@/lib/app-config";

export const Route = createFileRoute("/")({ component: HomePage });

function HomePage() {
	return (
		<main className="min-h-screen bg-background text-foreground">
			<header className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5">
				<BrandLogo />
				<Button asChild>
					<Link to="/auth">
						Open app
						<ArrowRight className="size-4" />
					</Link>
				</Button>
			</header>

			<section className="mx-auto grid max-w-6xl gap-10 px-5 py-16 md:grid-cols-[1fr_420px] md:items-center">
				<div>
					<p className="mb-4 font-bold text-primary text-sm uppercase">
						Production starter
					</p>
					<h1 className="max-w-3xl font-black text-5xl tracking-normal md:text-6xl">
						{appConfig.name}
					</h1>
					<p className="mt-5 max-w-2xl text-lg text-muted-foreground">
						Ship a paid web app faster with TanStack Start, Convex auth and
						database, Tailwind UI, Zod validation, Dodo checkout, and Cloudflare
						deployment already wired together.
					</p>
					<div className="mt-8 flex flex-wrap gap-3">
						<Button asChild size="lg">
							<Link to="/auth">
								Start building
								<ArrowRight className="size-4" />
							</Link>
						</Button>
					</div>
				</div>

				<Card className="border-border shadow-xl">
					<CardContent className="grid gap-4 p-6">
						{[
							"TanStack Start file routes",
							"Convex Auth and typed functions",
							"Dodo Payments checkout and webhooks",
							"Cloudflare Workers deploy script",
						].map((item) => (
							<div className="flex items-center gap-3" key={item}>
								<CheckCircle2 className="size-5 text-primary" />
								<span className="font-semibold">{item}</span>
							</div>
						))}
					</CardContent>
				</Card>
			</section>
		</main>
	);
}
