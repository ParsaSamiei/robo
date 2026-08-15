// Docs/09_TECHNICAL_ARCHITECTURE.md #1: Zod is part of the core stack.
// Server-side validation for the two public forms (Contact, Join) per
// Docs/10 #52 and #56.
import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(200),
  subject: z.string().trim().max(200).optional().or(z.literal("")),
  message: z.string().trim().min(1).max(5000),
});

export const joinSchema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(200),
  educationEn: z.string().trim().max(300).optional().or(z.literal("")),
  departmentId: z.string().trim().optional().or(z.literal("")),
  messageEn: z.string().trim().max(5000).optional().or(z.literal("")),
  githubUrl: z.string().trim().url().max(300).optional().or(z.literal("")),
  portfolioUrl: z.string().trim().url().max(300).optional().or(z.literal("")),
});

export type ContactInput = z.infer<typeof contactSchema>;
export type JoinInput = z.infer<typeof joinSchema>;
