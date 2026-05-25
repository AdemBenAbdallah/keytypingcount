import { useRef } from "react";
import type {
	CharacterComparison,
	PromptWord,
	TypingMetrics,
} from "./typing-engine";

type TypingContentProps = {
	characters: CharacterComparison[];
	metrics: TypingMetrics;
	onReset: () => void;
	onTypedTextChange: (typedText: string) => void;
	prompt: PromptWord[];
	typedText: string;
};

export function TypingContent({
	characters,
	metrics,
	onReset,
	onTypedTextChange,
	prompt,
	typedText,
}: TypingContentProps) {
	const inputRef = useRef<HTMLTextAreaElement>(null);

	return (
		<div className="ninja-typing-content">
			<div className="ninja-language-chip">
				<span className="ninja-language-chip__mark">◉</span>
				<span className="ninja-language-chip__label">日本語</span>
				<span className="ninja-language-chip__sub">
					{metrics.status === "finished" ? "complete" : "english"}
				</span>
			</div>
			<TypingStats metrics={metrics} onReset={onReset} />
			<div
				className="ninja-word-preview"
				role="img"
				aria-label="Typing preview text"
			>
				{prompt.map((word) => (
					<span
						className="ninja-word-preview__word"
						data-active={
							isActiveWord(word, typedText.length) ? "true" : "false"
						}
						key={word.id}
					>
						{Array.from(word.text).map((character, index) => {
							const characterIndex = word.start + index;
							const comparison = characters[characterIndex];

							return (
								<span
									className="ninja-word-preview__character"
									data-state={comparison?.state ?? "pending"}
									key={comparison?.id ?? `${word.id}-${index}`}
								>
									{characterIndex === typedText.length ? (
										<span
											className="ninja-word-preview__cursor"
											aria-hidden="true"
										/>
									) : null}
									{character}
								</span>
							);
						})}
						<SpaceCharacter
							character={characters[word.start + word.text.length]}
							typedLength={typedText.length}
						/>
					</span>
				))}
			</div>
			<textarea
				aria-label="Typing input"
				autoCapitalize="none"
				autoComplete="off"
				autoCorrect="off"
				className="ninja-typing-input"
				onChange={(event) => onTypedTextChange(event.currentTarget.value)}
				onKeyDown={(event) => {
					if (event.key === "Escape") {
						onReset();
					}
				}}
				readOnly={metrics.status === "finished"}
				ref={inputRef}
				spellCheck={false}
				value={typedText}
			/>
			<div className="ninja-content-emblem" aria-hidden="true">
				◉
			</div>
		</div>
	);
}

function TypingStats({
	metrics,
	onReset,
}: {
	metrics: TypingMetrics;
	onReset: () => void;
}) {
	const stats = [
		{ label: "time", value: metrics.remainingSeconds },
		{ label: "wpm", value: metrics.wpm },
		{ label: "acc", value: `${metrics.accuracy}%` },
		{ label: "chars", value: metrics.typedCharacters },
	] as const;

	return (
		<div className="ninja-typing-stats">
			{stats.map((stat) => (
				<div className="ninja-typing-stat" key={stat.label}>
					<span>{stat.value}</span>
					<span>{stat.label}</span>
				</div>
			))}
			<button className="ninja-reset-button" onClick={onReset} type="button">
				reset
			</button>
		</div>
	);
}

function isActiveWord(word: PromptWord, typedLength: number) {
	const wordEnd = word.start + word.text.length;

	return typedLength >= word.start && typedLength <= wordEnd;
}

function SpaceCharacter({
	character,
	typedLength,
}: {
	character: CharacterComparison | undefined;
	typedLength: number;
}) {
	if (!character || character.character !== " ") {
		return null;
	}

	return (
		<span
			className="ninja-word-preview__space"
			data-state={character.state}
			aria-hidden="true"
		>
			{character.id === `char-${typedLength}` ? (
				<span className="ninja-word-preview__cursor" />
			) : null}
		</span>
	);
}
