import { ninjaAsset } from "./assets";

type SideScrollPillarProps = {
	side: "left" | "right";
};

export function SideScrollPillar({ side }: SideScrollPillarProps) {
	return (
		<aside className={`ninja-scroll-pillar ninja-scroll-pillar--${side}`}>
			<img
				alt=""
				className="ninja-scroll-pillar__image"
				src={ninjaAsset(`scroll_pillar_${side}.webp`)}
			/>
			<div className="ninja-scroll-pillar__script" aria-hidden="true">
				{side === "left" ? "忍者" : "火影になる"}
			</div>
		</aside>
	);
}
