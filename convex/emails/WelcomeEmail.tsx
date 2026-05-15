import { Button, Heading, Text } from "react-email";
import { EmailDivider, EmailFrame, EmailMeta } from "./EmailFrame";

export function WelcomeEmail({
	appName,
	name,
	message,
	appUrl,
}: {
	appName: string;
	name?: string;
	message?: string;
	appUrl: string;
}) {
	const greeting = name ? `Hi ${name},` : "Hi there,";

	return (
		<EmailFrame appName={appName} preview={`Welcome to ${appName}`}>
			<Text className="m-0 mb-3 text-[16px] font-semibold text-[#111827]">
				{greeting}
			</Text>
			<Heading className="m-0 text-[30px] font-bold leading-[1.18] text-[#111827]">
				Your account is ready.
			</Heading>
			<Text className="mt-4 mb-0 text-[15px] leading-7 text-[#475569]">
				{message ??
					"We created this email example so you can wire up Resend quickly in a new app."}
			</Text>

			<EmailDivider />

			<EmailMeta>
				Use this template as a starting point for onboarding, passwordless
				login, notifications, or product updates.
			</EmailMeta>

			<EmailDivider />

			<Button
				className="rounded-full bg-[#0752e5] px-6 py-3 text-[15px] font-bold text-white no-underline"
				href={appUrl}
			>
				Open {appName}
			</Button>
		</EmailFrame>
	);
}
