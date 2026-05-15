import type { ReactNode } from "react";
import {
	Body,
	Container,
	Head,
	Heading,
	Hr,
	Html,
	Preview,
	Section,
	Tailwind,
	Text,
} from "react-email";

export function EmailFrame({
	appName,
	preview,
	children,
}: {
	appName: string;
	preview: string;
	children: ReactNode;
}) {
	return (
		<Tailwind>
			<Html>
				<Head />
				<Preview>{preview}</Preview>
				<Body className="m-0 bg-[#f8fafc] px-3 py-8 font-sans">
					<Container className="mx-auto max-w-[600px]">
						<Section className="rounded-[24px] border border-solid border-[#e2e8f0] bg-white p-8 shadow-[0_18px_50px_rgba(15,23,42,0.08)]">
							<Section className="pb-7">
								<Heading className="m-0 text-[18px] font-bold leading-none text-[#111827]">
									{appName}
								</Heading>
							</Section>

							{children}
						</Section>

						<Section className="px-4 pt-6">
							<Text className="m-0 text-center text-[12px] leading-5 text-[#64748b]">
								© {new Date().getFullYear()} {appName}. Built for production.
							</Text>
						</Section>
					</Container>
				</Body>
			</Html>
		</Tailwind>
	);
}

export function EmailDivider() {
	return (
		<Hr className="my-7 border-0 border-t border-solid border-[#e2e8f0]" />
	);
}

export function EmailMeta({ children }: { children: ReactNode }) {
	return (
		<Section className="rounded-[14px] border border-solid border-[#dbeafe] bg-[#f0f6ff] px-4 py-3">
			<Text className="m-0 text-[14px] leading-6 text-[#1e3a8a]">
				{children}
			</Text>
		</Section>
	);
}
