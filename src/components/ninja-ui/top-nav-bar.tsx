import { ninjaAsset, type TabIconName, tabIconAssets } from "./assets";
import type { TimerOption } from "./typing-engine";

type NavTabItem = {
	icon: TabIconName;
	id: string;
	label: string;
	sublabel: string;
};

const navTabs: NavTabItem[] = [
	{
		id: "punctuation",
		icon: "punctuation",
		label: "句点",
		sublabel: "punctuation",
	},
	{ id: "numbers", icon: "numbers", label: "数字", sublabel: "numbers" },
	{ id: "time", icon: "time", label: "時間", sublabel: "time" },
	{ id: "words", icon: "words", label: "単語", sublabel: "words" },
	{ id: "quote", icon: "quote", label: "引用", sublabel: "quote" },
	{ id: "zen", icon: "zen", label: "禅", sublabel: "zen" },
	{ id: "custom", icon: "custom", label: "カスタム", sublabel: "custom" },
];

type TopNavBarProps = {
	durationSeconds: TimerOption;
	onDurationChange: (durationSeconds: TimerOption) => void;
	timerOptions: readonly TimerOption[];
};

export function TopNavBar({
	durationSeconds,
	onDurationChange,
	timerOptions,
}: TopNavBarProps) {
	return (
		<header className="ninja-top-nav">
			<img
				alt=""
				className="ninja-top-nav__wood"
				src={ninjaAsset("nav_bar_main_idle.webp")}
			/>
			<div className="ninja-top-nav__content">
				<nav className="ninja-top-nav__tabs" aria-label="Typing modes">
					{navTabs.map((tab) => (
						<NavTab active={tab.id === "time"} item={tab} key={tab.id} />
					))}
				</nav>
				<TimerSelector
					durationSeconds={durationSeconds}
					onDurationChange={onDurationChange}
					timerOptions={timerOptions}
				/>
			</div>
		</header>
	);
}

function NavTab({ active, item }: { active?: boolean; item: NavTabItem }) {
	const icon = tabIconAssets[item.icon];

	return (
		<div className="ninja-nav-tab" data-active={active ? "true" : "false"}>
			<img
				alt=""
				className="ninja-nav-tab__frame"
				src={ninjaAsset(
					active
						? "panel_wood_banner_active_glow.webp"
						: "panel_wood_banner_idle.webp",
				)}
			/>
			<div className="ninja-nav-tab__content">
				<TabIcon active={active} darkSrc={icon.dark} glowSrc={icon.active} />
				<span className="ninja-nav-tab__text">
					<span>{item.label}</span>
					<span>{item.sublabel}</span>
				</span>
			</div>
		</div>
	);
}

function TabIcon({
	active,
	darkSrc,
	glowSrc,
}: {
	active?: boolean;
	darkSrc: string;
	glowSrc: string;
}) {
	return (
		<img
			alt=""
			className="ninja-nav-tab__icon"
			src={active ? glowSrc : darkSrc}
		/>
	);
}

function TimerSelector({
	durationSeconds,
	onDurationChange,
	timerOptions,
}: TopNavBarProps) {
	return (
		<div className="ninja-timer-selector">
			<img
				alt=""
				className="ninja-timer-selector__frame"
				src={ninjaAsset("panel_wood_long.webp")}
			/>
			<div className="ninja-timer-selector__content">
				{timerOptions.map((option) => (
					<button
						aria-pressed={option === durationSeconds}
						className="ninja-timer-selector__option"
						data-active={option === durationSeconds ? "true" : "false"}
						key={option}
						onClick={(event) => {
							event.currentTarget.blur();
							onDurationChange(option);
						}}
						type="button"
					>
						{option}
					</button>
				))}
				<img
					alt=""
					className="ninja-timer-selector__shuriken"
					src={ninjaAsset("emblem_star_orange_glow.webp")}
				/>
			</div>
		</div>
	);
}
