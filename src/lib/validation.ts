import { z } from "zod";

export const authFormSchema = z.object({
	email: z.string().email(),
	password: z.string().min(6),
	name: z.string().min(1).optional(),
});

export const settingsFormSchema = z.object({
	name: z.string().trim().min(1).max(120),
	timezone: z.string().trim().min(1).max(80),
});

export type SettingsFormInput = z.infer<typeof settingsFormSchema>;
