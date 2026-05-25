import { BackgroundScene } from "./background-scene";
import { CenterEmblem } from "./center-emblem";
import { ForegroundProps } from "./foreground-props";
import { MainParchmentPanel } from "./main-parchment-panel";
import { SideScrollPillar } from "./side-scroll-pillar";
import { TopNavBar } from "./top-nav-bar";
import { useTypingSession } from "./use-typing-session";

export function NinjaTypingScreen() {
	const typingSession = useTypingSession();

	return (
		<main className="ninja-screen">
			<BackgroundScene />
			<div className="ninja-stage">
				<CenterEmblem />
				<TopNavBar
					durationSeconds={typingSession.durationSeconds}
					onDurationChange={typingSession.setDuration}
					timerOptions={typingSession.timerOptions}
				/>
				<div className="ninja-stage__middle">
					<SideScrollPillar side="left" />
					<MainParchmentPanel
						characters={typingSession.characters}
						metrics={typingSession.metrics}
						onReset={typingSession.reset}
						prompt={typingSession.prompt}
						typedText={typingSession.typedText}
					/>
					<SideScrollPillar side="right" />
				</div>
				<ForegroundProps />
			</div>
		</main>
	);
}
