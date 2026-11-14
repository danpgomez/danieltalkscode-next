import { z } from "zod";

export const contactSchema = z.object({
    name: z.string().trim().min(1, "Please enter your name.").max(100),
    email: z.string().trim().max(200).pipe(z.email("Please enter a valid email address.")),
    message: z.string().trim().min(10, "Please write at least 10 characters.").max(2000)
});

type Field = "name" | "email" | "message";

export type ContactState = {
    status: "idle" | "success" | "error";
    message: string;
    errors: Partial<Record<Field, string[]>>
    values: Record<Field, string>
};

export const initialState: ContactState = {
    status: "idle",
    message: "",
    errors: {},
    values: { name: "", email: "", message: "" }
};