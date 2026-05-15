import { useAuthActions } from "@convex-dev/auth/react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import type { FormEvent } from "react";
import { useState } from "react";
import { BrandLogo } from "@/components/brand-logo";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { authFormSchema } from "@/lib/validation";

export const Route = createFileRoute("/auth")({ component: AuthPage });

function AuthPage() {
	const navigate = useNavigate();
	const { signIn } = useAuthActions();
	const [mode, setMode] = useState<"login" | "signup">("login");
	const [error, setError] = useState<string | null>(null);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isGoogleSubmitting, setIsGoogleSubmitting] = useState(false);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [name, setName] = useState("");

	async function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		setError(null);

		const parsed = authFormSchema.safeParse({
			email,
			password,
			...(mode === "signup" ? { name } : {}),
		});
		if (!parsed.success) {
			setError(
				"Enter a valid email and a password with at least 6 characters.",
			);
			return;
		}

		setIsSubmitting(true);
		try {
			await signIn("password", {
				email: parsed.data.email.toLowerCase().trim(),
				password: parsed.data.password,
				flow: mode === "signup" ? "signUp" : "signIn",
				...(mode === "signup" ? { name: parsed.data.name } : {}),
			});
			void navigate({ to: "/dashboard" });
		} catch (caught) {
			const message = caught instanceof Error ? caught.message : String(caught);
			setError(mode === "login" ? "Invalid email or password." : message);
		} finally {
			setIsSubmitting(false);
		}
	}

	async function handleGoogleSignIn() {
		setError(null);
		setIsGoogleSubmitting(true);
		try {
			await signIn("google", { redirectTo: "/dashboard" });
		} catch (caught) {
			const message = caught instanceof Error ? caught.message : String(caught);
			setError(`Could not sign in with Google: ${message}`);
			setIsGoogleSubmitting(false);
		}
	}

	return (
		<main className="grid min-h-screen place-items-center bg-background px-5 text-foreground">
			<form className="w-full max-w-md" onSubmit={handleSubmit}>
				<Card className="p-8">
					<CardHeader className="p-0">
						<BrandLogo className="mb-8" />
						<CardTitle>
							{mode === "login" ? "Sign in" : "Create account"}
						</CardTitle>
						<CardDescription>
							Use email and password or continue with Google.
						</CardDescription>
					</CardHeader>
					<CardContent className="mt-6 p-0">
						<Button
							className="mb-5 h-12 w-full"
							disabled={isSubmitting || isGoogleSubmitting}
							onClick={() => void handleGoogleSignIn()}
							type="button"
							variant="outline"
						>
							{isGoogleSubmitting ? "Connecting..." : "Continue with Google"}
						</Button>
						<div className="mb-5 flex items-center gap-4">
							<Separator className="flex-1" />
							<span className="text-muted-foreground text-sm">or</span>
							<Separator className="flex-1" />
						</div>
						{error ? (
							<p className="mb-5 rounded-lg border border-destructive/30 bg-destructive/10 p-3 font-semibold text-destructive text-sm">
								{error}
							</p>
						) : null}
						{mode === "signup" ? (
							<div className="mb-4 grid gap-2">
								<Label>Name</Label>
								<Input
									onChange={(event) => setName(event.target.value)}
									required
									value={name}
								/>
							</div>
						) : null}
						<div className="mb-4 grid gap-2">
							<Label>Email</Label>
							<Input
								onChange={(event) => setEmail(event.target.value)}
								required
								type="email"
								value={email}
							/>
						</div>
						<div className="mb-6 grid gap-2">
							<Label>Password</Label>
							<Input
								minLength={6}
								onChange={(event) => setPassword(event.target.value)}
								required
								type="password"
								value={password}
							/>
						</div>
						<Button
							className="h-12 w-full"
							disabled={isSubmitting || isGoogleSubmitting}
							type="submit"
						>
							{isSubmitting
								? "Working..."
								: mode === "login"
									? "Sign in"
									: "Sign up"}
						</Button>
						<Button
							className="mt-4 w-full"
							disabled={isSubmitting || isGoogleSubmitting}
							onClick={() => {
								setMode(mode === "login" ? "signup" : "login");
								setError(null);
							}}
							type="button"
							variant="ghost"
						>
							{mode === "login"
								? "Need an account? Sign up"
								: "Already have an account? Sign in"}
						</Button>
					</CardContent>
				</Card>
			</form>
		</main>
	);
}
