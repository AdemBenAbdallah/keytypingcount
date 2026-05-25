const NINJA_ASSET_ROOT = "/assets/ninja-ui";

export const ninjaAsset = (fileName: string) =>
	`${NINJA_ASSET_ROOT}/${fileName}`;

export const tabIconAssets = {
	punctuation: {
		dark: ninjaAsset("icon_question_dark.webp"),
		active: ninjaAsset("icon_question_orange_glow.webp"),
	},
	numbers: {
		dark: ninjaAsset("icon_exclamation_dark.webp"),
		active: ninjaAsset("icon_exclamation_orange_glow.webp"),
	},
	time: {
		dark: ninjaAsset("icon_time_dark.webp"),
		active: ninjaAsset("icon_time_orange_glow.webp"),
	},
	words: {
		dark: ninjaAsset("icon_quill_dark.webp"),
		active: ninjaAsset("icon_quill_orange_glow.webp"),
	},
	quote: {
		dark: ninjaAsset("icon_quotes_dark.webp"),
		active: ninjaAsset("icon_quotes_orange_glow.webp"),
	},
	zen: {
		dark: ninjaAsset("emblem_mountain_dark.webp"),
		active: ninjaAsset("emblem_mountain_orange_glow.webp"),
	},
	custom: {
		dark: ninjaAsset("icon_wrench_dark.webp"),
		active: ninjaAsset("icon_wrench_orange_glow.webp"),
	},
} as const;

export type TabIconName = keyof typeof tabIconAssets;
