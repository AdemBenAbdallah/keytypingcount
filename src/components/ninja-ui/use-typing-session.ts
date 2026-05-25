import { useEffect, useMemo, useReducer } from "react";
import {
	calculateMetrics,
	compareCharacters,
	createPrompt,
	getTypingStatus,
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
	| { type: "append"; character: string; now: number; targetText: string }
	| { type: "backspace"; deleteWord: boolean; now: number; targetText: string }
	| { type: "reset"; now: number }
	| { type: "set-duration"; durationSeconds: TimerOption; now: number }
	| { type: "tick"; now: number };

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
		case "append": {
			if (isSessionFinished(state, action.now, action.targetText)) {
				return state;
			}

			const nextTypedText = `${state.typedText}${action.character}`.slice(
				0,
				action.targetText.length,
			);

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
		case "backspace": {
			if (isSessionFinished(state, action.now, action.targetText)) {
				return state;
			}

			return {
				...state,
				now: action.now,
				typedText: action.deleteWord
					? removePreviousWord(state.typedText)
					: state.typedText.slice(0, -1),
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

	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (shouldIgnoreKeyEvent(event)) {
				return;
			}

			if (event.key === "Escape") {
				event.preventDefault();
				dispatch({ type: "reset", now: Date.now() });
				return;
			}

			if (event.key === "Backspace" || event.key === "Delete") {
				event.preventDefault();
				dispatch({
					type: "backspace",
					deleteWord: event.ctrlKey || event.altKey,
					now: Date.now(),
					targetText,
				});
				return;
			}

			if (event.key.length === 1 && !event.metaKey && !event.ctrlKey) {
				event.preventDefault();
				dispatch({
					type: "append",
					character: event.key,
					now: Date.now(),
					targetText,
				});
			}
		};

		window.addEventListener("keydown", handleKeyDown);

		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [targetText]);

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
	};
}

function isSessionFinished(
	state: TypingSessionState,
	now: number,
	targetText: string,
) {
	return (
		getTypingStatus({
			durationSeconds: state.durationSeconds,
			now,
			startedAt: state.startedAt,
			targetText,
			typedText: state.typedText,
		}) === "finished"
	);
}

function removePreviousWord(typedText: string) {
	return typedText.replace(/\s*\S+\s*$/, "");
}

function shouldIgnoreKeyEvent(event: KeyboardEvent) {
	if (event.defaultPrevented || event.isComposing) {
		return true;
	}

	const target = event.target;

	if (!(target instanceof HTMLElement)) {
		return false;
	}

	if (
		target.closest("button, input, textarea, select, [contenteditable='true']")
	) {
		return true;
	}

	return false;
}
