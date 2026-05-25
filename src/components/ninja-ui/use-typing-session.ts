import { useEffect, useMemo, useReducer } from "react";
import {
	calculateMetrics,
	compareCharacters,
	createPrompt,
	promptToText,
	TIMER_OPTIONS,
	type TimerOption,
	type TypingMetrics,
} from "./typing-engine";

type TypingSessionState = {
	durationSeconds: TimerOption;
	now: number;
	promptSeed: number;
	startedAt: number | null;
	typedText: string;
};

type TypingSessionAction =
	| { type: "reset"; now: number }
	| { type: "set-duration"; durationSeconds: TimerOption; now: number }
	| { type: "tick"; now: number }
	| { type: "type"; targetText: string; typedText: string; now: number };

const initialState: TypingSessionState = {
	durationSeconds: 30,
	now: 0,
	promptSeed: 0,
	startedAt: null,
	typedText: "",
};

function typingSessionReducer(
	state: TypingSessionState,
	action: TypingSessionAction,
): TypingSessionState {
	switch (action.type) {
		case "reset":
			return {
				...state,
				now: action.now,
				promptSeed: state.promptSeed + 1,
				startedAt: null,
				typedText: "",
			};
		case "set-duration":
			return {
				...state,
				durationSeconds: action.durationSeconds,
				now: action.now,
				promptSeed: state.promptSeed + 1,
				startedAt: null,
				typedText: "",
			};
		case "tick":
			return {
				...state,
				now: action.now,
			};
		case "type": {
			const nextTypedText = action.typedText.slice(0, action.targetText.length);

			return {
				...state,
				now: action.now,
				startedAt:
					state.startedAt === null && nextTypedText.length > 0
						? action.now
						: state.startedAt,
				typedText: nextTypedText,
			};
		}
		default:
			return state;
	}
}

export function useTypingSession() {
	const [state, dispatch] = useReducer(typingSessionReducer, initialState);
	const prompt = useMemo(
		() => createPrompt(72, state.promptSeed),
		[state.promptSeed],
	);
	const targetText = useMemo(() => promptToText(prompt), [prompt]);
	const metrics: TypingMetrics = calculateMetrics({
		durationSeconds: state.durationSeconds,
		now: state.now,
		startedAt: state.startedAt,
		targetText,
		typedText: state.typedText,
	});
	const characters = compareCharacters(targetText, state.typedText);
	const isFinished = metrics.status === "finished";

	useEffect(() => {
		if (metrics.status !== "running") {
			return;
		}

		const intervalId = window.setInterval(() => {
			dispatch({ type: "tick", now: Date.now() });
		}, 250);

		return () => window.clearInterval(intervalId);
	}, [metrics.status]);

	return {
		characters,
		durationSeconds: state.durationSeconds,
		isFinished,
		metrics,
		prompt,
		targetText,
		timerOptions: TIMER_OPTIONS,
		typedText: state.typedText,
		reset: () => dispatch({ type: "reset", now: Date.now() }),
		setDuration: (durationSeconds: TimerOption) =>
			dispatch({ type: "set-duration", durationSeconds, now: Date.now() }),
		setTypedText: (typedText: string) => {
			if (isFinished) {
				return;
			}

			dispatch({
				type: "type",
				now: Date.now(),
				targetText,
				typedText,
			});
		},
	};
}
