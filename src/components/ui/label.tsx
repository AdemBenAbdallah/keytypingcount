import { cn } from "@/lib/utils";

function Label({ className, ...props }: React.ComponentProps<"span">) {
	return (
		<span
			className={cn(
				"text-sm font-medium leading-none text-foreground",
				className,
			)}
			{...props}
		/>
	);
}

export { Label };
