import { ninjaAsset } from "./assets";

export function CenterEmblem() {
	return (
		<div className="ninja-emblem" aria-hidden="true">
			<img
				alt=""
				className="ninja-emblem__mark"
				src={ninjaAsset("emblem_leaf_dark.webp")}
			/>
		</div>
	);
}
