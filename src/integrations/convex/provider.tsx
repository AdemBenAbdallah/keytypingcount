/// <reference types="vite/client" />

import { ConvexAuthProvider } from "@convex-dev/auth/react";
import { ConvexReactClient } from "convex/react";

const convexUrl = import.meta.env.VITE_CONVEX_URL;
const convexClient = convexUrl ? new ConvexReactClient(convexUrl) : null;

export function AppConvexProvider({ children }: { children: React.ReactNode }) {
	if (!convexClient) {
		return <>{children}</>;
	}

	return (
		<ConvexAuthProvider client={convexClient}>{children}</ConvexAuthProvider>
	);
}
