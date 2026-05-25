import { ninjaAsset } from "./assets";
import { TextureOverlay } from "./texture-overlay";
import { TypingContent } from "./typing-content";
import type {
	CharacterComparison,
	PromptWord,
	TypingMetrics,
} from "./typing-engine";

type MainParchmentPanelProps = {
	characters: CharacterComparison[];
	metrics: TypingMetrics;
	onReset: () => void;
	prompt: PromptWord[];
	typedText: string;
};

export function MainParchmentPanel({
	characters,
	metrics,
	onReset,
	prompt,
	typedText,
}: MainParchmentPanelProps) {
	return (
		<section className="ninja-parchment" aria-label="Typing area preview">
			<img
				alt=""
				className="ninja-parchment__main"
				src={ninjaAsset("panel_parchment_main.webp")}
			/>
			<ParchmentTrim />
			<TextureOverlay layer="parchment" />
			<TypingContent
				characters={characters}
				metrics={metrics}
				onReset={onReset}
				prompt={prompt}
				typedText={typedText}
			/>
		</section>
	);
}

function ParchmentTrim() {
	return (
		<div className="ninja-parchment-trim" aria-hidden="true">
			<img
				alt=""
				className="ninja-parchment-trim__corner ninja-parchment-trim__corner--left"
				src={ninjaAsset("panel_parchment_corner_top_left.webp")}
			/>
			<img
				alt=""
				className="ninja-parchment-trim__top"
				src={ninjaAsset("panel_parchment_strip_top_center.webp")}
			/>
			<img
				alt=""
				className="ninja-parchment-trim__corner ninja-parchment-trim__corner--right"
				src={ninjaAsset("panel_parchment_corner_top_right.webp")}
			/>
			<img
				alt=""
				className="ninja-parchment-trim__block ninja-parchment-trim__block--left"
				src={ninjaAsset("panel_parchment_block_left.webp")}
			/>
			<img
				alt=""
				className="ninja-parchment-trim__block ninja-parchment-trim__block--right"
				src={ninjaAsset("panel_parchment_block_right.webp")}
			/>
		</div>
	);
}
