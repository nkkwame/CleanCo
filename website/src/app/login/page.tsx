"use client";
import { useState } from "react";
import { useAuth } from "../AuthContext";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [regForm, setRegForm] = useState({ email: "", password: "", company: "" });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [regErrors, setRegErrors] = useState<{ [key: string]: string }>({});
  const [submitted, setSubmitted] = useState(false);
  const [serverMsg, setServerMsg] = useState("");
  const [showRegister, setShowRegister] = useState(false);
  const { login } = useAuth();

  function validateLogin() {
    const errs: { [key: string]: string } = {};
    if (!form.email) errs.email = "Email is required.";
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) errs.email = "Invalid email.";
    if (!form.password) errs.password = "Password is required.";
    return errs;
  }

  function validateRegister() {
    const errs: { [key: string]: string } = {};
    if (!regForm.company) errs.company = "Company name is required.";
    if (!regForm.email) errs.email = "Email is required.";
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(regForm.email)) errs.email = "Invalid email.";
    if (!regForm.password) errs.password = "Password is required.";
    else if (regForm.password.length < 6) errs.password = "Password must be at least 6 characters.";
    return errs;
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    const errs = validateLogin();
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      setServerMsg(data.message);
      if (data.success) {
        setSubmitted(true);
        login(form.email);
      }
    }
  }

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    const errs = validateRegister();
    setRegErrors(errs);
    if (Object.keys(errs).length === 0) {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(regForm),
      });
      const data = await res.json();
      setServerMsg(data.message);
      if (data.success) {
        setShowRegister(false);
        setServerMsg("Registration successful! You can now log in.");
      }
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }
  function handleRegChange(e: React.ChangeEvent<HTMLInputElement>) {
    setRegForm({ ...regForm, [e.target.name]: e.target.value });
  }

  return (
    <section className="max-w-md mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-6 text-blue-900">{showRegister ? "Register" : "Login"}</h1>
      {showRegister ? (
        <form className="flex flex-col gap-4" onSubmit={handleRegister} noValidate>
          <div>
            <label htmlFor="company" className="block font-medium mb-1">Company Name</label>
            <input type="text" id="company" name="company" value={regForm.company} onChange={handleRegChange} className="w-full border rounded px-3 py-2" />
            {regErrors.company && <p className="text-red-600 text-sm mt-1">{regErrors.company}</p>}
          </div>
          <div>
            <label htmlFor="email" className="block font-medium mb-1">Email</label>
            <input type="email" id="email" name="email" value={regForm.email} onChange={handleRegChange} className="w-full border rounded px-3 py-2" />
            {regErrors.email && <p className="text-red-600 text-sm mt-1">{regErrors.email}</p>}
          </div>
          <div>
            <label htmlFor="password" className="block font-medium mb-1">Password</label>
            <input type="password" id="password" name="password" value={regForm.password} onChange={handleRegChange} className="w-full border rounded px-3 py-2" />
            {regErrors.password && <p className="text-red-600 text-sm mt-1">{regErrors.password}</p>}
          </div>
          <button type="submit" className="bg-blue-900 text-white py-2 rounded font-bold">Register</button>
          <button type="button" className="text-blue-900 underline mt-2" onClick={() => setShowRegister(false)}>Already have an account? Login</button>
        </form>
      ) : submitted ? (
        <div className="bg-green-100 text-green-800 p-4 rounded">{serverMsg}</div>
      ) : (
        <form className="flex flex-col gap-4" onSubmit={handleLogin} noValidate>
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
          <button type="submit" className="bg-blue-900 text-white py-2 rounded font-bold">Login</button>
          <button type="button" className="text-blue-900 underline mt-2" onClick={() => setShowRegister(true)}>Don't have an account? Register</button>
        </form>
      )}
      {serverMsg && !submitted && (
        <div className="bg-blue-100 text-blue-800 p-2 rounded mt-4">{serverMsg}</div>
      )}
    </section>
  );
}
