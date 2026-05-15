import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
	const { resolvedTheme, setTheme, theme } = useTheme();
	const isDark = resolvedTheme === "dark";
	const nextTheme = isDark ? "light" : "dark";

	return (
		<Button
			aria-label={`Switch to ${nextTheme} mode`}
			className={cn(
				"size-10 rounded-full border border-border bg-card p-0 text-muted-foreground shadow-sm transition hover:bg-accent hover:text-accent-foreground",
				className,
			)}
			onClick={() => setTheme(nextTheme)}
			title={`Switch to ${nextTheme} mode`}
			type="button"
			variant="ghost"
		>
			{isDark ? (
				<Sun className="size-4.5" strokeWidth={2.2} />
			) : (
				<Moon className="size-4.5" strokeWidth={2.2} />
			)}
			<span className="sr-only">
				Current theme:{" "}
				{theme === "system" ? `system (${resolvedTheme})` : theme}
			</span>
		</Button>
	);
}
