"use client";
import { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({ company: "", email: "", message: "" });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [submitted, setSubmitted] = useState(false);

  function validate() {
    const errs: { [key: string]: string } = {};
    if (!form.company) errs.company = "Company name is required.";
    if (!form.email) errs.email = "Email is required.";
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) errs.email = "Invalid email.";
    if (!form.message) errs.message = "Message is required.";
    return errs;
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      setSubmitted(true);
      // Here you would send the form data to your backend
    }
  }

  return (
    <section>
      <h1 className="text-3xl font-bold mb-6 text-blue-900">Contact Us</h1>
      {submitted ? (
        <div className="bg-green-100 text-green-800 p-4 rounded">Thank you! We'll get back to you soon.</div>
      ) : (
        <form className="max-w-md mx-auto flex flex-col gap-4" onSubmit={handleSubmit} noValidate>
          <div>
            <label htmlFor="company" className="block font-medium mb-1">Company Name</label>
            <input type="text" id="company" name="company" value={form.company} onChange={handleChange} className="w-full border rounded px-3 py-2" />
            {errors.company && <p className="text-red-600 text-sm mt-1">{errors.company}</p>}
          </div>
          <div>
            <label htmlFor="email" className="block font-medium mb-1">Email</label>
            <input type="email" id="email" name="email" value={form.email} onChange={handleChange} className="w-full border rounded px-3 py-2" />
            {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
          </div>
          <div>
            <label htmlFor="message" className="block font-medium mb-1">Message</label>
            <textarea id="message" name="message" value={form.message} onChange={handleChange} className="w-full border rounded px-3 py-2" />
            {errors.message && <p className="text-red-600 text-sm mt-1">{errors.message}</p>}
          </div>
          <button type="submit" className="bg-blue-900 text-white py-2 rounded font-bold">Request a Quote</button>
        </form>
      )}
    </section>
  );
}
