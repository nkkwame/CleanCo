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
    // Simulate fetching referrals and cleaners from backend
    setTimeout(() => {
      setReferrals([
        { id: 1, companyName: "Acme Corp", companyEmail: "info@acme.com", status: "Pending" },
        { id: 2, companyName: "Globex Inc", companyEmail: "contact@globex.com", status: "Rewarded" },
      ]);
      setCleaners([
        { id: 1, name: "Ama Mensah", age: 28, email: "ama@cleanco.com", contact: "+233 555 123 456" },
        { id: 2, name: "Kwesi Boateng", age: 35, email: "kwesi@cleanco.com", contact: "+233 555 654 321" },
      ]);
      setLoading(false);
    }, 1000);
  }, [user, router]);

  if (!user) return null;

  function handleComplaintSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Here you would send the complaint to the backend
    setComplaintMsg("Your complaint has been submitted. We'll get back to you soon.");
    setComplaint("");
  }

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
      </div>
      {/* Referrals Section */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Referrals</h2>
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
    </section>
  );
}
