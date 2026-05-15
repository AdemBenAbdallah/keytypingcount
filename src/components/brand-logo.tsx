import { appConfig } from "@/lib/app-config";
import { cn } from "@/lib/utils";

export function BrandLogo({ className }: { className?: string }) {
	return (
		<div className={cn("flex items-center gap-3", className)}>
			<div className="grid size-9 place-items-center rounded-lg bg-primary font-black text-primary-foreground">
				{appConfig.name.slice(0, 1).toUpperCase()}
			</div>
			<div className="min-w-0">
				<p className="truncate font-bold text-foreground text-sm">
					{appConfig.name}
				</p>
				<p className="truncate text-muted-foreground text-xs">SaaS template</p>
			</div>
		</div>
	);
}
