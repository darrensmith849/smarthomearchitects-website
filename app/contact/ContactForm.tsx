"use client";

import { useState, type FormEvent } from "react";

const STUDIO_EMAIL = "studio@smarthomearchitects.co.za";
const INTERESTS = ["Lighting", "Shading", "Climate", "Audio", "Security", "Whole home"];

/** Mail clients start truncating well before this; the notes field is the only
 *  part long enough to matter, so it is the only part we trim. */
const NOTES_LIMIT = 1200;

function line(label: string, value: string) {
  return value ? `${label}: ${value}\n` : "";
}

function composeEnquiry(data: FormData) {
  const read = (name: string) => String(data.get(name) ?? "").trim();
  const first = read("first-name");
  const last = read("last-name");
  const interests = data.getAll("interests").map(String);
  const notes = read("notes").slice(0, NOTES_LIMIT);

  const subject = `Consultation request — ${[first, last].filter(Boolean).join(" ") || "New enquiry"}`;
  const body =
    line("Name", [first, last].filter(Boolean).join(" ")) +
    line("Email", read("email")) +
    line("Project location", read("location")) +
    line("Project stage", read("stage")) +
    line("Interested in", interests.join(", ")) +
    (notes ? `\nNotes:\n${notes}\n` : "");

  return `mailto:${STUDIO_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function ContactForm() {
  const [sent, setSent] = useState(false);

  /* A form POST to a mailto: action is ignored by most current browsers, so the
     enquiry is assembled here and handed to the mail client as a link instead. */
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    window.location.href = composeEnquiry(new FormData(event.currentTarget));
    setSent(true);
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <label>First name<input name="first-name" type="text" autoComplete="given-name" required placeholder="Your first name" /></label>
        <label>Last name<input name="last-name" type="text" autoComplete="family-name" required placeholder="Your last name" /></label>
      </div>
      <label>Email<input name="email" type="email" autoComplete="email" required placeholder="you@example.com" /></label>
      <label>Project location<input name="location" type="text" placeholder="City or region" /></label>
      <label>Project stage
        <select name="stage" defaultValue="">
          <option value="" disabled>Select a stage</option>
          <option>Looking for a site</option>
          <option>Concept design</option>
          <option>Developed design</option>
          <option>On site</option>
          <option>Existing residence</option>
        </select>
      </label>
      <fieldset>
        <legend>What should the home understand?</legend>
        <div className="interest-grid">
          {INTERESTS.map((interest) => (
            <label key={interest}><input type="checkbox" name="interests" value={interest} /><span>{interest}</span></label>
          ))}
        </div>
      </fieldset>
      <label>Anything else we should know?<textarea name="notes" rows={4} placeholder="A few words about the home, the design team or what matters most to you." /></label>
      <button className="button button-dark" type="submit">Request a consultation <span>↗</span></button>
      <p className="form-note" role="status">
        {sent
          ? <>Your email app should now hold the enquiry, ready to send. If nothing opened, write to <a href={`mailto:${STUDIO_EMAIL}`}>{STUDIO_EMAIL}</a> instead.</>
          : <>Submitting opens your email app with these details ready to send. You can also write to <a href={`mailto:${STUDIO_EMAIL}`}>{STUDIO_EMAIL}</a> directly.</>}
      </p>
    </form>
  );
}
