import { ninjaAsset } from "./assets";

const props = [
	{
		className: "ninja-prop ninja-prop--headband",
		src: "prop_headband_leaf_main.webp",
	},
	{
		className: "ninja-prop ninja-prop--papers",
		src: "prop_papers_stack.webp",
	},
	{
		className: "ninja-prop ninja-prop--scroll",
		src: "prop_scroll_parchment.webp",
	},
	{
		className: "ninja-prop ninja-prop--red-scroll",
		src: "prop_scroll_red.webp",
	},
	{
		className: "ninja-prop ninja-prop--kunai",
		src: "prop_kunai_main.webp",
	},
	{
		className: "ninja-prop ninja-prop--shuriken",
		src: "prop_shuriken_main.webp",
	},
] as const;

export function ForegroundProps() {
	return (
		<div className="ninja-foreground" aria-hidden="true">
			<img
				alt=""
				className="ninja-foreground__table"
				src={ninjaAsset("prop_wood_table.webp")}
			/>
			{props.map((prop) => (
				<img
					alt=""
					className={prop.className}
					key={prop.src}
					src={ninjaAsset(prop.src)}
				/>
			))}
		</div>
	);
}
