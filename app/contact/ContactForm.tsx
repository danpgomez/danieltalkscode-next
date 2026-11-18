"use client";

import { useActionState, useEffect, useRef } from "react";
import { sendMessage } from "./actions";
import { initialState } from "./schema";
import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";
import styles from "./ContactForm.module.css";

function ContactForm() {
    const [state, formAction, pending] = useActionState(sendMessage, initialState);
    const turnstileRef = useRef<TurnstileInstance>(null);

    // Each token works exactly once, so fetch a fresh one after every submission
    useEffect(() => {
        if (state.status !== "error") {
            turnstileRef.current?.reset();
        }
    }, [state]);

    const thanksRef = useRef<HTMLParagraphElement>(null);
    useEffect(() => {
        if (state.status === "success") {
            thanksRef.current?.focus();
        }
    }, [state.status]);

    if (state.status === "success") {
        return (
            <p ref={thanksRef} tabIndex={-1}>
                {state.message}
            </p>
        );
    }

    return (
        <form action={formAction} className="not-prose mt-8 space-y-6">
            <div className={styles.field}>
                <label htmlFor="name" className="block text-sm font-medium text-gray-900">
                    Name
                </label>
                <input 
                    id="name"
                    name="name"
                    autoComplete="name"
                    required
                    defaultValue={state.values.name}
                    aria-invalid={Boolean(state.errors.name)}
                    aria-describedby={state.errors.name ? "name-error" : undefined}
                    className="mt-1 block w-full rounded-lg border border-gray-500 bg-white px-3 py-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-800"
                />
                {state.errors.name && <p id="name-error" className={styles.error}>{state.errors.name[0]}</p>}
            </div>

            <div className={styles.field}>
                <label htmlFor="email">Email</label>
                <input 
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    defaultValue={state.values.email}
                    aria-invalid={Boolean(state.errors.email)}
                    aria-describedby={state.errors.email ? "email-error" : undefined}
                    className="mt-1 block w-full rounded-lg border border-gray-500 bg-white px-3 py-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-800"
                />
                {state.errors.email && <p id="email-error" className={styles.error}>{state.errors.email[0]}</p>}
            </div>

            <div className={styles.field}>
                <label htmlFor="message" className="block text-sm font-medium text-gray-900">
                    Message
                </label>
                <textarea 
                    id="message"
                    name="message"
                    rows={6}
                    required
                    minLength={10}
                    defaultValue={state.values.message}
                    aria-invalid={Boolean(state.errors.message)}
                    aria-describedby={state.errors.message ? "message-error" : undefined}
                    className="mt-1 block w-full rounded-lg border border-gray-500 bg-white px-3 py-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-800"
                />
                {state.errors.message && <p id="message-error" className={styles.error}>{state.errors.message[0]}</p>}
            </div>

            {/* Honeypot: hidden from sight, keyboards, and screen readers */}
            <div className={styles.honeypot} aria-hidden="true">
                <label htmlFor="website">Leave this field empty</label>
                <input id="website" name="website" tabIndex={-1} autoComplete="off" />
            </div>

            <Turnstile 
                ref={turnstileRef}
                siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
            />

            <button 
                type="submit" 
                disabled={pending}
                className="rounded-lg bg-gray-900 px-5 py-2.5 font-medium text-white hover:bg-gray-700 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50"
            >
                {pending ? "Sending..." : "Send message"}
            </button>

            {/* This region must exist before its text changes, or screen readers miss the update */}
            <p role="status" className="text-sm text-gray-700">{state.message}</p>
        </form>
    );
}

export default ContactForm;