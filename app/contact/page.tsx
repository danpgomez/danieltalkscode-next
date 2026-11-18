import ContactForm from "./ContactForm";

export default function ContactPage() {
    return (
        <>
            <h1>Contact Me</h1>
            <p className="lead">Send me a message using the form below, or reach me by {" "}
                <a href="mailto:contact@danpgomez.com">email</a>, or {" "}
                <a href="https://www.linkedin.com/in/danpgomez/">LinkedIn</a>.
            </p>

            <ContactForm />
        </>
    );
};