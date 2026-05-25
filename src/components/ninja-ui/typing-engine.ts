export const TIMER_OPTIONS = [15, 30, 60, 120] as const;

export type TimerOption = (typeof TIMER_OPTIONS)[number];

export type CharacterState = "pending" | "correct" | "incorrect";

export type TypingStatus = "idle" | "running" | "finished";

export type PromptWord = {
	id: string;
	start: number;
	text: string;
};

export type CharacterComparison = {
	character: string;
	id: string;
	state: CharacterState;
};

export type TypingMetrics = {
	accuracy: number;
	correctCharacters: number;
	elapsedSeconds: number;
	incorrectCharacters: number;
	progress: number;
	rawCharacters: number;
	remainingSeconds: number;
	status: TypingStatus;
	totalCharacters: number;
	typedCharacters: number;
	wpm: number;
	wordsCompleted: number;
};

const WORD_BANK = [
	"come",
	"we",
	"with",
	"he",
	"do",
	"up",
	"other",
	"right",
	"might",
	"new",
	"how",
	"of",
	"develop",
	"not",
	"look",
	"off",
	"feel",
	"by",
	"while",
	"work",
	"begin",
	"possible",
	"which",
	"help",
	"without",
	"or",
	"use",
	"as",
	"see",
	"public",
	"will",
	"she",
	"from",
	"face",
	"before",
	"just",
	"same",
	"each",
	"part",
	"you",
	"hand",
	"stand",
	"bright",
	"shadow",
	"river",
	"silent",
	"blade",
	"focus",
	"swift",
	"paper",
	"village",
	"signal",
	"climb",
	"steady",
	"strike",
	"moon",
	"ember",
	"forest",
	"path",
] as const;

export function createPrompt(wordCount = 64, offset = 0): PromptWord[] {
	let start = 0;

	return Array.from({ length: wordCount }, (_, index) => {
		const text = WORD_BANK[(index + offset) % WORD_BANK.length];
		const word: PromptWord = {
			id: `prompt-word-${index + 1}`,
			start,
			text,
		};

		start += text.length + 1;

		return word;
	});
}

export function promptToText(prompt: PromptWord[]) {
	return prompt.map((word) => word.text).join(" ");
}

export function compareCharacters(
	targetText: string,
	typedText: string,
): CharacterComparison[] {
	return Array.from(targetText).map((character, index) => ({
		character,
		id: `char-${index}`,
		state:
			index >= typedText.length
				? "pending"
				: typedText[index] === character
					? "correct"
					: "incorrect",
	}));
}

export function getTypingStatus({
	durationSeconds,
	startedAt,
	targetText,
	typedText,
	now,
}: {
	durationSeconds: TimerOption;
	now: number;
	startedAt: number | null;
	targetText: string;
	typedText: string;
}): TypingStatus {
	if (startedAt === null) {
		return "idle";
	}

	const elapsedSeconds = Math.floor((now - startedAt) / 1000);

	if (
		elapsedSeconds >= durationSeconds ||
		typedText.length >= targetText.length
	) {
		return "finished";
	}

	return "running";
}

export function calculateMetrics({
	durationSeconds,
	startedAt,
	targetText,
	typedText,
	now,
}: {
	durationSeconds: TimerOption;
	now: number;
	startedAt: number | null;
	targetText: string;
	typedText: string;
}): TypingMetrics {
	const elapsedSeconds =
		startedAt === null
			? 0
			: Math.min(durationSeconds, Math.floor((now - startedAt) / 1000));
	const status = getTypingStatus({
		durationSeconds,
		now,
		startedAt,
		targetText,
		typedText,
	});
	const comparisons = compareCharacters(targetText, typedText);
	const typedComparisons = comparisons.slice(0, typedText.length);
	const correctCharacters = typedComparisons.filter(
		(character) => character.state === "correct",
	).length;
	const incorrectCharacters = Math.max(0, typedText.length - correctCharacters);
	const accuracy =
		typedText.length === 0
			? 100
			: Math.round((correctCharacters / typedText.length) * 100);
	const minutes = Math.max(elapsedSeconds / 60, 1 / 60);
	const wpm =
		startedAt === null ? 0 : Math.round(correctCharacters / 5 / minutes);

	return {
		accuracy,
		correctCharacters,
		elapsedSeconds,
		incorrectCharacters,
		progress: Math.min(
			100,
			Math.round((typedText.length / targetText.length) * 100),
		),
		rawCharacters: typedText.length,
		remainingSeconds: Math.max(0, durationSeconds - elapsedSeconds),
		status,
		totalCharacters: targetText.length,
		typedCharacters: typedText.length,
		wpm,
		wordsCompleted: countCompletedWords(targetText, typedText),
	};
}

function countCompletedWords(targetText: string, typedText: string) {
	if (typedText.length === 0) {
		return 0;
	}

	const targetWords = targetText.split(" ");
	let cursor = 0;
	let completedWords = 0;

	for (const word of targetWords) {
		const typedWord = typedText.slice(cursor, cursor + word.length);
		const typedSeparator = typedText[cursor + word.length];
		const isLastTypedWord = typedText.length === cursor + word.length;

		if (typedWord !== word) {
			break;
		}

		if (isLastTypedWord || typedSeparator === " ") {
			completedWords += 1;
		}

		cursor += word.length + 1;
	}

	return completedWords;
}
