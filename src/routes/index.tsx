import { createFileRoute } from "@tanstack/react-router";
import { NinjaTypingScreen } from "@/components/ninja-ui/ninja-typing-screen";

export const Route = createFileRoute("/")({ component: HomePage });

function HomePage() {
	return <NinjaTypingScreen />;
}
