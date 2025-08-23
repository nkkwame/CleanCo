"use client";
import { useState } from "react";

export default function Register() {
  const [form, setForm] = useState({ email: "", password: "", company: "" });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [submitted, setSubmitted] = useState(false);
  const [serverMsg, setServerMsg] = useState("");

  function validate() {
    const errs: { [key: string]: string } = {};
    if (!form.company) errs.company = "Company name is required.";
    if (!form.email) errs.email = "Email is required.";
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) errs.email = "Invalid email.";
    if (!form.password) errs.password = "Password is required.";
    else if (form.password.length < 6) errs.password = "Password must be at least 6 characters.";
    return errs;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      const res = await fetch("/api/register", {
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
      <h1 className="text-3xl font-bold mb-6 text-blue-900">Register</h1>
      {submitted ? (
        <div className="bg-green-100 text-green-800 p-4 rounded">{serverMsg}</div>
      ) : (
        <form className="flex flex-col gap-4" onSubmit={handleSubmit} noValidate>
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
            <label htmlFor="password" className="block font-medium mb-1">Password</label>
            <input type="password" id="password" name="password" value={form.password} onChange={handleChange} className="w-full border rounded px-3 py-2" />
            {errors.password && <p className="text-red-600 text-sm mt-1">{errors.password}</p>}
          </div>
          <button type="submit" className="bg-blue-900 text-white py-2 rounded font-bold">Register</button>
        </form>
      )}
      {serverMsg && !submitted && (
        <div className="bg-red-100 text-red-800 p-2 rounded mt-4">{serverMsg}</div>
      )}
    </section>
  );
}
