import ContactForm from "./ContactForm";

export default function ContactPage() {
    return (
        <>
            <h2>Contact Me</h2>
            <p>Send me a message using the form below, or via <a href="mailto:contact@danpgomez.com">email</a>, or <a href="https://www.linkedin.com/in/danpgomez/">my LinkedIn</a> or the form below.</p>

            <ContactForm />
        </>
    );
};