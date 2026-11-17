import ContactForm from "./ContactForm";

export default function ContactPage() {
    return (
        <>
            <h1>Contact Me</h1>
            <p>Send me a message using the form below, or via <a href="mailto:contact@danpgomez.com">email</a>, or <a href="https://www.linkedin.com/in/danpgomez/">my LinkedIn</a>.</p>

            <ContactForm />
        </>
    );
};