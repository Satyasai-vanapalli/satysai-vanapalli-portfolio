"use client";

import { useState } from "react";
import { ArrowUpRight, Check, Mail, MapPin, Phone, Send } from "lucide-react";
import emailjs from "@emailjs/browser";
import { profile } from "@/data/profile";

type FormData = { name: string; email: string; subject: string; message: string };
type SubmitStatus = "idle" | "success" | "error" | "unconfigured";

const emptyForm: FormData = { name: "", email: "", subject: "", message: "" };

export default function ContactSection() {
  const [formData, setFormData] = useState<FormData>(emptyForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("idle");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      setSubmitStatus("unconfigured");
      setIsSubmitting(false);
      return;
    }

    try {
      await emailjs.send(serviceId, templateId, {
        from_name: formData.name,
        reply_to: formData.email,
        subject: formData.subject,
        message: formData.message,
        to_name: profile.name,
      }, publicKey);
      setSubmitStatus("success");
      setFormData(emptyForm);
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section contact-section section-anchor">
      <div className="site-container">
        <div className="contact-card">
          <div className="contact-copy">
            <p className="eyebrow">06 / GET IN TOUCH</p>
            <h2>Have a good idea?<br /><em>Let’s talk.</em></h2>
            <p className="contact-lede">I’m open to internships, collaborations, and thoughtful conversations about software.</p>

            <div className="contact-details">
              <a href={`mailto:${profile.contact.email}`}><span><Mail size={17} /></span><span><small>EMAIL</small>{profile.contact.email}</span><ArrowUpRight size={15} /></a>
              <a href={`tel:${profile.contact.phone.replace(/[^0-9+]/g, "")}`}><span><Phone size={17} /></span><span><small>PHONE</small>{profile.contact.phone}</span><ArrowUpRight size={15} /></a>
              <div><span><MapPin size={17} /></span><span><small>LOCATION</small>{profile.contact.location}</span></div>
            </div>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            <p className="form-intro">Send me a note<span> · I’ll get back to you soon</span></p>
            <div className="form-row">
              <label>Name<input name="name" autoComplete="name" value={formData.name} onChange={handleChange} placeholder="Your name" required /></label>
              <label>Email<input name="email" type="email" autoComplete="email" value={formData.email} onChange={handleChange} placeholder="you@example.com" required /></label>
            </div>
            <label>Subject<input name="subject" value={formData.subject} onChange={handleChange} placeholder="What would you like to discuss?" required /></label>
            <label>Message<textarea name="message" value={formData.message} onChange={handleChange} placeholder="A little context goes a long way…" rows={4} required /></label>
            <button className="button button-lime form-submit" type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Sending…" : "Send message"}{isSubmitting ? <span className="button-spinner" /> : <Send size={16} />}
            </button>
            <div className={`form-status${submitStatus === "idle" ? " is-empty" : ""}`} aria-live="polite">
              {submitStatus === "success" && <><Check size={15} /> Your message has been sent. Thank you!</>}
              {submitStatus === "error" && <>Something went wrong. Please email me directly.</>}
              {submitStatus === "unconfigured" && <>The message form isn’t connected yet. Email me at <a href={`mailto:${profile.contact.email}`}>{profile.contact.email}</a>.</>}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
