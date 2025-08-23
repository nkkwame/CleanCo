"use client";
import { useState } from "react";

export default function Referrals() {
  const [form, setForm] = useState({ referrerEmail: "", companyName: "", companyEmail: "" });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [submitted, setSubmitted] = useState(false);
  const [serverMsg, setServerMsg] = useState("");

  function validate() {
    const errs: { [key: string]: string } = {};
    if (!form.referrerEmail) errs.referrerEmail = "Your email is required.";
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.referrerEmail)) errs.referrerEmail = "Invalid email.";
    if (!form.companyName) errs.companyName = "Company name is required.";
    if (!form.companyEmail) errs.companyEmail = "Company email is required.";
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.companyEmail)) errs.companyEmail = "Invalid email.";
    return errs;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      const res = await fetch("/api/referrals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      setServerMsg(data.message);
      if (data.success) setSubmitted(true);
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  return (
    <section className="max-w-md mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-6 text-blue-900">Referrals</h1>
      <p className="mb-4">Refer a company to CleanCo and earn rewards!</p>
      {submitted ? (
        <div className="bg-green-100 text-green-800 p-4 rounded">{serverMsg}</div>
      ) : (
        <form className="flex flex-col gap-4" onSubmit={handleSubmit} noValidate>
          <div>
            <label htmlFor="referrerEmail" className="block font-medium mb-1">Your Email</label>
            <input type="email" id="referrerEmail" name="referrerEmail" value={form.referrerEmail} onChange={handleChange} className="w-full border rounded px-3 py-2" />
            {errors.referrerEmail && <p className="text-red-600 text-sm mt-1">{errors.referrerEmail}</p>}
          </div>
          <div>
            <label htmlFor="companyName" className="block font-medium mb-1">Company Name</label>
            <input type="text" id="companyName" name="companyName" value={form.companyName} onChange={handleChange} className="w-full border rounded px-3 py-2" />
            {errors.companyName && <p className="text-red-600 text-sm mt-1">{errors.companyName}</p>}
          </div>
          <div>
            <label htmlFor="companyEmail" className="block font-medium mb-1">Company Email</label>
            <input type="email" id="companyEmail" name="companyEmail" value={form.companyEmail} onChange={handleChange} className="w-full border rounded px-3 py-2" />
            {errors.companyEmail && <p className="text-red-600 text-sm mt-1">{errors.companyEmail}</p>}
          </div>
          <button type="submit" className="bg-blue-900 text-white py-2 rounded font-bold">Submit Referral</button>
        </form>
      )}
      {serverMsg && !submitted && (
        <div className="bg-red-100 text-red-800 p-2 rounded mt-4">{serverMsg}</div>
      )}
    </section>
  );
}
