import { useConvexAuth } from "@convex-dev/auth/react";
import { TanStackDevtools } from "@tanstack/react-devtools";
import {
	createRootRoute,
	HeadContent,
	Outlet,
	Scripts,
	useLocation,
	useNavigate,
} from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { useEffect } from "react";
import { ThemeProvider } from "@/components/theme-provider";
import { AppConvexProvider } from "@/integrations/convex/provider";
import { appConfig } from "@/lib/app-config";
import appCss from "../styles.css?url";

const publicPaths = new Set(["/", "/auth"]);

export const Route = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{ name: "viewport", content: "width=device-width, initial-scale=1" },
			{ title: appConfig.name },
			{ name: "description", content: appConfig.description },
		],
		links: [
			{ rel: "stylesheet", href: appCss },
			{ rel: "icon", href: "/logo.png", type: "image/png" },
		],
	}),
	component: RootLayout,
});

function RootLayout() {
	return (
		<html lang="en">
			<head>
				<HeadContent />
			</head>
			<body>
				<ThemeProvider defaultTheme="light">
					<AppConvexProvider>
						<AuthGuard />
						<TanStackDevtools
							config={{ position: "bottom-left" }}
							plugins={[
								{
									name: "TanStack Router",
									render: <TanStackRouterDevtoolsPanel />,
								},
							]}
						/>
					</AppConvexProvider>
				</ThemeProvider>
				<Scripts />
			</body>
		</html>
	);
}

function AuthGuard() {
	const auth = useConvexAuth();
	const isLoading = auth?.isLoading ?? true;
	const isAuthenticated = auth?.isAuthenticated ?? false;
	const location = useLocation();
	const navigate = useNavigate();
	const pathname = location.pathname;
	const isPublicPath = publicPaths.has(pathname);

	useEffect(() => {
		if (isLoading) {
			return;
		}

		if (!isAuthenticated && !isPublicPath) {
			void navigate({ to: "/auth", replace: true });
		}

		if (isAuthenticated && (pathname === "/" || pathname === "/auth")) {
			void navigate({ to: "/dashboard", replace: true });
		}
	}, [isLoading, isAuthenticated, isPublicPath, pathname, navigate]);

	if (!isPublicPath && isLoading) {
		return (
			<div className="grid min-h-screen place-items-center bg-background">
				<div className="text-muted-foreground">Loading&hellip;</div>
			</div>
		);
	}

	return <Outlet />;
}
