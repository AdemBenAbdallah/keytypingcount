import { createContext, type ReactNode, use, useEffect, useState } from "react";

type Theme = "dark" | "light" | "system";

type ThemeProviderState = {
	theme: Theme;
	resolvedTheme: "dark" | "light";
	setTheme: (theme: Theme) => void;
};

const initialState: ThemeProviderState = {
	theme: "light",
	resolvedTheme: "light",
	setTheme: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
	children,
	defaultTheme = "light",
	storageKey = "vite-ui-theme",
	...props
}: {
	children: ReactNode;
	defaultTheme?: Theme;
	storageKey?: string;
}) {
	const [theme, setTheme] = useState<Theme>(() => {
		if (typeof window === "undefined") {
			return defaultTheme;
		}

		const storedTheme = window.localStorage.getItem(storageKey);
		if (
			storedTheme === "light" ||
			storedTheme === "dark" ||
			storedTheme === "system"
		) {
			return storedTheme;
		}

		return defaultTheme;
	});
	const [resolvedTheme, setResolvedTheme] = useState<"dark" | "light">("light");

	useEffect(() => {
		const root = window.document.documentElement;
		const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

		function applyTheme() {
			const nextResolvedTheme =
				theme === "system" ? (mediaQuery.matches ? "dark" : "light") : theme;

			root.classList.remove("light", "dark");
			root.classList.add(nextResolvedTheme);
			root.style.colorScheme = nextResolvedTheme;
			setResolvedTheme(nextResolvedTheme);
		}

		applyTheme();

		if (theme !== "system") {
			return;
		}

		mediaQuery.addEventListener("change", applyTheme);
		return () => mediaQuery.removeEventListener("change", applyTheme);
	}, [theme]);

	const value = {
		theme,
		resolvedTheme,
		setTheme: (theme: Theme) => {
			window.localStorage.setItem(storageKey, theme);
			setTheme(theme);
		},
	};

	return (
		<ThemeProviderContext.Provider {...props} value={value}>
			{children}
		</ThemeProviderContext.Provider>
	);
}

export const useTheme = () => {
	const context = use(ThemeProviderContext);

	if (context === undefined)
		throw new Error("useTheme must be used within a ThemeProvider");

	return context;
};
