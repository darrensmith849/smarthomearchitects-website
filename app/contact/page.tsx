import type { Metadata } from "next";

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
        <form className="contact-form" action="mailto:studio@smarthomearchitects.co.za" method="post" encType="text/plain">
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
              {['Lighting', 'Shading', 'Climate', 'Audio', 'Security', 'Whole home'].map((interest) => (
                <label key={interest}><input type="checkbox" name="interests" value={interest} /><span>{interest}</span></label>
              ))}
            </div>
          </fieldset>
          <label>Anything else we should know?<textarea name="notes" rows={4} placeholder="A few words about the home, the design team or what matters most to you." /></label>
          <button className="button button-dark" type="submit">Request a consultation <span>↗</span></button>
          <p className="form-note">Submitting opens your email app with these details ready to send.</p>
        </form>
      </div>
    </section>
  );
}
