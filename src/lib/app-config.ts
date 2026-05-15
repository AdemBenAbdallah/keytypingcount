import {
	CreditCard,
	Home,
	LayoutDashboard,
	type LucideIcon,
	Settings,
} from "lucide-react";

export const appConfig = {
	name: import.meta.env.VITE_APP_NAME || "Your App",
	description: "A production-ready TanStack Start and Convex starter.",
};

export type NavItem = {
	label: string;
	to: "/dashboard" | "/settings" | "/billing";
	icon: LucideIcon;
};

export const navItems: NavItem[] = [
	{ label: "Dashboard", to: "/dashboard", icon: LayoutDashboard },
	{ label: "Billing", to: "/billing", icon: CreditCard },
	{ label: "Settings", to: "/settings", icon: Settings },
];

export const publicNavItems = [{ label: "Home", to: "/", icon: Home }];
