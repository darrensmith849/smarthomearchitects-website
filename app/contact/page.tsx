import type { Metadata } from "next";
import { ContactForm } from "./ContactForm";

export const metadata: Metadata = {
  title: "Start a Project",
  description: "Book a private design consultation with Smart Home Architects.",
};

export default function ContactPage() {
  return (
    <section className="contact-page">
      <div className="contact-intro">
        <p className="eyebrow eyebrow-light">Private consultation</p>
        <h1>Tell us about<br />the life inside.</h1>
        <p>Plans are welcome at any stage, though the earliest conversations tend to create the quietest results.</p>
        <div className="contact-details">
          <div><span>Studio</span><p>Cape Town · Johannesburg</p></div>
          <div><span>Write</span><a href="mailto:studio@smarthomearchitects.co.za">studio@smarthomearchitects.co.za</a></div>
          <div><span>Typical reply</span><p>Within one studio day</p></div>
        </div>
      </div>
      <div className="contact-form-wrap">
        <ContactForm />
      </div>
    </section>
  );
}
