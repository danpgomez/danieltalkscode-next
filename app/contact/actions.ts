"use server";

import { Resend } from "resend";
import { contactSchema, initialState, type ContactState } from "./schema";
import { z } from "zod";

function requireEnvVariable(name: string) {
    const value = process.env[name];
    if (!value) {
        throw new Error(`Missing environment variable ${name}`);
    }

    return value;
}

async function verifyTurnstile(token: string): Promise<boolean> {
    const secret = requireEnvVariable("TURNSTILE_SECRET_KEY");

    try {
        const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
            method: "POST",
            body: new URLSearchParams({ secret, response: token }),
        });

        const result = (await response.json()) as { success: boolean };
        return result.success === true; 
    } catch {
        return false;
    }
}

const resend = new Resend(requireEnvVariable("RESEND_API_KEY"));

export async function sendMessage(
    _previousState: ContactState,
    formData: FormData
): Promise<ContactState> {

    const values = {
        name: String(formData.get("name") ?? ""),
        email: String(formData.get("email") ?? ""),
        message: String(formData.get("message") ?? "")
    };

    // Honeypot 🍯: humans never see this field, bots fill it in.
    // Pretend success so the bot doesn't learn it was caught.
    if (formData.get("website")) {
        return { ...initialState, status: "success", message: "Thanks! Your message was sent." };
    }

    const parsed = contactSchema.safeParse(values);
    if (!parsed.success) {
        return {
            status: "error",
            message: "Please fix the highlighted fields",
            errors: z.flattenError(parsed.error).fieldErrors,
            values,
        };
    }

    const token = formData.get("cf-turnstile-response");
    if (typeof token !== "string" || !(await verifyTurnstile(token))) {
        return {
            status: "error",
            message: "We couldn't verify you're human. Please try again.",
            errors: {},
            values
        };
    }

    const { name, email, message } = parsed.data;
    const { error } = await resend.emails.send({
        from: requireEnvVariable("CONTACT_FROM_EMAIL"),
        to: requireEnvVariable("CONTACT_TO_EMAIL"),
        replyTo: email, // Send replies to the email they provide
        subject: "New message from your portfolio", // Fixed message on purpose
        text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    });

    if (error) {
        console.error("Resend failed: ", error);
        return {
            status: "error",
            message: "Something went wrong sending your message. Please try again, or email me directly.",
            errors: {},
            values,
        };
    }

    return { ...initialState, status: "success", message: "Thanks! Your message was sent." };
};
