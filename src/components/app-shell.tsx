import { useAuthActions } from "@convex-dev/auth/react";
import { Link, useLocation } from "@tanstack/react-router";
import { LogOut } from "lucide-react";
import { BrandLogo } from "@/components/brand-logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { navItems } from "@/lib/app-config";
import { cn } from "@/lib/utils";

export function AppShell({ children }: { children: React.ReactNode }) {
	const { signOut } = useAuthActions();
	const location = useLocation();

	return (
		<div className="min-h-screen bg-background text-foreground">
			<aside className="fixed inset-y-0 left-0 hidden w-64 border-border border-r bg-sidebar px-4 py-5 lg:block">
				<BrandLogo className="mb-8" />
				<nav className="grid gap-1">
					{navItems.map((item) => {
						const Icon = item.icon;
						const isActive = location.pathname === item.to;

						return (
							<Link
								className={cn(
									"flex items-center gap-3 rounded-lg px-3 py-2.5 font-semibold text-sidebar-foreground text-sm transition hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
									isActive &&
										"bg-sidebar-accent text-sidebar-accent-foreground",
								)}
								key={item.to}
								to={item.to}
							>
								<Icon className="size-4" />
								{item.label}
							</Link>
						);
					})}
				</nav>
			</aside>

			<div className="lg:pl-64">
				<header className="sticky top-0 z-10 flex h-16 items-center justify-between border-border border-b bg-background/90 px-4 backdrop-blur md:px-8">
					<div className="lg:hidden">
						<BrandLogo />
					</div>
					<div className="hidden lg:block" />
					<div className="flex items-center gap-2">
						<ThemeToggle />
						<Button
							onClick={() => void signOut()}
							size="sm"
							type="button"
							variant="outline"
						>
							<LogOut className="size-4" />
							Sign out
						</Button>
					</div>
				</header>
				<main className="mx-auto w-full max-w-6xl px-4 py-8 md:px-8">
					{children}
				</main>
			</div>
		</div>
	);
}
