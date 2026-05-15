import { Button, Heading, Text } from "react-email";
import { EmailDivider, EmailFrame } from "./EmailFrame";

export function ActivationEmail({
	appName,
	username,
	planName,
	appUrl,
}: {
	appName: string;
	username?: string;
	planName: string;
	appUrl: string;
}) {
	const greeting = username ? `Hi ${username},` : "Hi there,";

	return (
		<EmailFrame appName={appName} preview={`Your ${appName} account is active`}>
			<Text className="m-0 mb-3 text-[16px] font-semibold text-[#111827]">
				{greeting}
			</Text>
			<Heading className="m-0 text-[30px] font-bold leading-[1.18] text-[#111827]">
				Your {planName} plan is active.
			</Heading>
			<Text className="mt-4 mb-0 text-[15px] leading-7 text-[#475569]">
				You can sign in to {appName} and start using your workspace right away.
			</Text>

			<EmailDivider />

			<Button
				className="rounded-full bg-[#0752e5] px-6 py-3 text-[15px] font-bold text-white no-underline"
				href={appUrl}
			>
				Sign in to {appName}
			</Button>

			<Text className="mt-6 mb-0 text-[13px] leading-6 text-[#64748b]">
				If you already created your account, sign in with the same email you
				used during checkout.
			</Text>
		</EmailFrame>
	);
}
