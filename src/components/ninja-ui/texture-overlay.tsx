import { ninjaAsset } from "./assets";

type TextureOverlayProps = {
	layer: "atmosphere" | "parchment";
};

const atmosphereTextures = [
	{
		className: "ninja-texture ninja-texture--dust",
		src: "effect_dust_spray.webp",
	},
	{
		className: "ninja-texture ninja-texture--ink-left",
		src: "effect_ink_splat_large_left.webp",
	},
	{
		className: "ninja-texture ninja-texture--ink-dots",
		src: "effect_ink_dots_cluster.webp",
	},
] as const;

const parchmentTextures = [
	{
		className: "ninja-texture ninja-texture--cloud-left",
		src: "ornament_cloud_large_left.webp",
	},
	{
		className: "ninja-texture ninja-texture--cloud-right",
		src: "ornament_cloud_large_right.webp",
	},
	{
		className: "ninja-texture ninja-texture--cloud-low",
		src: "ornament_cloud_center.webp",
	},
	{
		className: "ninja-texture ninja-texture--crack-right",
		src: "effect_crack_long_right.webp",
	},
	{
		className: "ninja-texture ninja-texture--crack-center",
		src: "effect_crack_wide_center.webp",
	},
] as const;

export function TextureOverlay({ layer }: TextureOverlayProps) {
	const textures =
		layer === "atmosphere" ? atmosphereTextures : parchmentTextures;

	return (
		<div
			className={`ninja-textures ninja-textures--${layer}`}
			aria-hidden="true"
		>
			{textures.map((texture) => (
				<img
					alt=""
					className={texture.className}
					key={texture.src}
					src={ninjaAsset(texture.src)}
				/>
			))}
		</div>
	);
}
