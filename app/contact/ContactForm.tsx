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
        if (state.status !== "idle") {
            turnstileRef.current?.reset();
        }
    }, [state]);

    return (
        <form action={formAction} className={styles.form}>
            <div className={styles.field}>
                <label htmlFor="name">Name</label>
                <input 
                    id="name"
                    name="name"
                    autoComplete="name"
                    required
                    defaultValue={state.values.name}
                    aria-invalid={Boolean(state.errors.name)}
                    aria-describedby={state.errors.name ? "name-error" : undefined}
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
                />
                {state.errors.email && <p id="email-error" className={styles.error}>{state.errors.email[0]}</p>}
            </div>

            <div className={styles.field}>
                <label htmlFor="message">Message</label>
                <textarea 
                    id="message"
                    name="message"
                    rows={6}
                    required
                    minLength={10}
                    defaultValue={state.values.message}
                    aria-invalid={Boolean(state.errors.message)}
                    aria-describedby={state.errors.message ? "message-error" : undefined}
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

            <button type="submit" disabled={pending}>
                {pending ? "Sending..." : "Send message"}
            </button>

            {/* This region must exist before its text changes, or screen readers miss the update */}
            <p role="status">{state.message}</p>
        </form>
    );
}

export default ContactForm;