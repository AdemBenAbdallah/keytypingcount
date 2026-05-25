import { ninjaAsset } from "./assets";
import { TextureOverlay } from "./texture-overlay";

export function BackgroundScene() {
	return (
		<div className="ninja-scene-bg" aria-hidden="true">
			<img
				alt=""
				className="ninja-scene-bg__image"
				src={ninjaAsset("background_ninja_village_sunset.webp")}
			/>
			<div className="ninja-scene-bg__vignette" />
			<TextureOverlay layer="atmosphere" />
		</div>
	);
}
