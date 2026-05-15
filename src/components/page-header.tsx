import type { ReactNode } from "react";

export function PageHeader({
	title,
	description,
	actions,
}: {
	title: string;
	description?: string;
	actions?: ReactNode;
}) {
	return (
		<div className="mb-8 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
			<div>
				<h1 className="font-bold text-3xl text-foreground tracking-normal">
					{title}
				</h1>
				{description ? (
					<p className="mt-2 max-w-2xl text-muted-foreground">{description}</p>
				) : null}
			</div>
			{actions ? <div className="shrink-0">{actions}</div> : null}
		</div>
	);
}
