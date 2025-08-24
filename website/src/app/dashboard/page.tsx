"use client";
import { useEffect, useState } from "react";
import { useAuth } from "../AuthContext";
import { useRouter } from "next/navigation";

type Referral = {
  id: number;
  companyName: string;
  companyEmail: string;
  status: string;
};

type Cleaner = {
  id: number;
  name: string;
  age: number;
  email: string;
  contact: string;
};

export default function Dashboard() {
  const { user } = useAuth();
  const router = useRouter();
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [cleaners, setCleaners] = useState<Cleaner[]>([]);
  const [loading, setLoading] = useState(true);
  const [complaint, setComplaint] = useState("");
  const [complaintMsg, setComplaintMsg] = useState("");

  useEffect(() => {
    if (!user) {
      router.replace("/login");
      return;
    }
    // Fetch referrals (demo)
    setTimeout(() => {
      setReferrals([
        { id: 1, companyName: "Acme Corp", companyEmail: "info@acme.com", status: "Pending" },
        { id: 2, companyName: "Globex Inc", companyEmail: "contact@globex.com", status: "Rewarded" },
      ]);
    }, 500);
    // Fetch cleaners from API
    fetch("/api/cleaners")
      .then(res => res.json())
      .then(data => setCleaners(data))
      .finally(() => setLoading(false));
  }, [user, router]);

  // Fetch complaint history
  const [complaints, setComplaints] = useState<{ email: string; message: string; date: string }[]>([]);
  useEffect(() => {
    if (user) {
      fetch("/api/complaints")
        .then(res => res.json())
        .then(data => setComplaints(data));
    }
  }, [user, complaintMsg]);

  function handleComplaintSubmit(e: React.FormEvent) {
    e.preventDefault();
    fetch("/api/complaints", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: user?.email, message: complaint }),
    })
      .then(res => res.json())
      .then(data => setComplaintMsg(data.message));
    setComplaint("");
  }

  // Company profile state
  const [profile, setProfile] = useState<{ name: string; address: string; phone: string; password?: string } | null>(null);
  const [profileMsg, setProfileMsg] = useState("");

  useEffect(() => {
    if (user) {
      fetch(`/api/company?email=${user.email}`)
        .then(res => res.json())
        .then(data => setProfile(data));
    }
  }, [user]);

  function handleProfileChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!profile) return;
    setProfile({ ...profile, [e.target.name]: e.target.value });
  }

  function handleProfileSubmit(e: React.FormEvent) {
    e.preventDefault();
    fetch("/api/company", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: user?.email, ...profile }),
    })
      .then(res => res.json())
      .then(data => setProfileMsg(data.message));
  }

  if (!user) return null;

  return (
    <section className="max-w-4xl mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-6 text-blue-900">Dashboard</h1>
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-semibold mb-2">Welcome, {user.email}</h2>
        <p className="mb-2">Here you can manage your company profile, view assigned cleaners, referrals, and make complaints.</p>
      </div>
      {/* Assigned Cleaners Section */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">Assigned Cleaners</h2>
        {loading ? (
          <p>Loading cleaners...</p>
        ) : cleaners.length === 0 ? (
          <p>No cleaners assigned yet.</p>
        ) : (
          <table className="w-full text-left border mt-4">
            <thead>
              <tr>
                <th className="py-2 px-3 border-b">Name</th>
                <th className="py-2 px-3 border-b">Age</th>
                <th className="py-2 px-3 border-b">Email</th>
                <th className="py-2 px-3 border-b">Contact</th>
              </tr>
            </thead>
            <tbody>
              {cleaners.map(c => (
                <tr key={c.id}>
                  <td className="py-2 px-3 border-b">{c.name}</td>
                  <td className="py-2 px-3 border-b">{c.age}</td>
                  <td className="py-2 px-3 border-b">{c.email}</td>
                  <td className="py-2 px-3 border-b">{c.contact}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      {/* Complaint Section */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">Make a Complaint</h2>
        <form className="flex flex-col gap-4" onSubmit={handleComplaintSubmit}>
          <textarea
            value={complaint}
            onChange={e => setComplaint(e.target.value)}
            placeholder="Describe your issue..."
            className="w-full border rounded px-3 py-2"
            required
          />
          <button type="submit" className="bg-blue-900 text-white py-2 rounded font-bold">Submit Complaint</button>
        </form>
        {complaintMsg && <div className="bg-green-100 text-green-800 p-2 rounded mt-4">{complaintMsg}</div>}
        {/* Complaint History */}
        <div className="mt-6">
          <h3 className="font-semibold mb-2">Complaint History</h3>
          {complaints.length === 0 ? (
            <p>No complaints yet.</p>
          ) : (
            <ul className="text-sm space-y-2">
              {complaints.filter(c => c.email === user?.email).map((c, idx) => (
                <li key={idx} className="border-b pb-2">
                  <span className="font-bold">{new Date(c.date).toLocaleString()}:</span> {c.message}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      {/* Referrals Section */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Referrals</h2>
        <ReferralForm />
        {loading ? (
          <p>Loading referrals...</p>
        ) : referrals.length === 0 ? (
          <p>No referrals yet. Start referring companies to earn rewards!</p>
        ) : (
          <table className="w-full text-left border mt-4">
            <thead>
              <tr>
                <th className="py-2 px-3 border-b">Company Name</th>
                <th className="py-2 px-3 border-b">Company Email</th>
                <th className="py-2 px-3 border-b">Status</th>
              </tr>
            </thead>
            <tbody>
              {referrals.map(ref => (
                <tr key={ref.id}>
                  <td className="py-2 px-3 border-b">{ref.companyName}</td>
                  <td className="py-2 px-3 border-b">{ref.companyEmail}</td>
                  <td className="py-2 px-3 border-b">{ref.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      {/* Company Profile Section */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">Company Profile</h2>
        {profile ? (
          <form className="flex flex-col gap-4" onSubmit={handleProfileSubmit}>
            <div>
              <label className="block font-medium mb-1">Company Name</label>
              <input type="text" name="name" value={profile.name} onChange={handleProfileChange} className="w-full border rounded px-3 py-2" />
            </div>
            <div>
              <label className="block font-medium mb-1">Address</label>
              <input type="text" name="address" value={profile.address} onChange={handleProfileChange} className="w-full border rounded px-3 py-2" />
            </div>
            <div>
              <label className="block font-medium mb-1">Phone</label>
              <input type="text" name="phone" value={profile.phone} onChange={handleProfileChange} className="w-full border rounded px-3 py-2" />
            </div>
            <div>
              <label className="block font-medium mb-1">Change Password</label>
              <input type="password" name="password" value={profile.password || ""} onChange={handleProfileChange} className="w-full border rounded px-3 py-2" />
            </div>
            <button type="submit" className="bg-blue-900 text-white py-2 rounded font-bold">Update Profile</button>
            {profileMsg && <div className="bg-green-100 text-green-800 p-2 rounded mt-2">{profileMsg}</div>}
          </form>
        ) : (
          <p>Loading profile...</p>
        )}
      </div>
    </section>
  );
}

function ReferralForm() {
  const [form, setForm] = useState({ companyName: "", companyEmail: "" });
  const [msg, setMsg] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  function validate() {
    const errs: { [key: string]: string } = {};
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
      // Here you would send the referral to the backend
      setMsg("Referral submitted! Thank you.");
      setForm({ companyName: "", companyEmail: "" });
    }
  }

  return (
    <form className="flex flex-col gap-3 mb-6" onSubmit={handleSubmit}>
      <div>
        <input
          type="text"
          name="companyName"
          value={form.companyName}
          onChange={e => setForm({ ...form, companyName: e.target.value })}
          placeholder="Company Name"
          className="w-full border rounded px-3 py-2"
        />
        {errors.companyName && <p className="text-red-600 text-sm mt-1">{errors.companyName}</p>}
      </div>
      <div>
        <input
          type="email"
          name="companyEmail"
          value={form.companyEmail}
          onChange={e => setForm({ ...form, companyEmail: e.target.value })}
          placeholder="Company Email"
          className="w-full border rounded px-3 py-2"
        />
        {errors.companyEmail && <p className="text-red-600 text-sm mt-1">{errors.companyEmail}</p>}
      </div>
      <button type="submit" className="bg-blue-900 text-white py-2 rounded font-bold">Add Referral</button>
      {msg && <div className="bg-green-100 text-green-800 p-2 rounded mt-2">{msg}</div>}
    </form>
  );
}
