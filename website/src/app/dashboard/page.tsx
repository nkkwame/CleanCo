"use client";
import { useEffect, useState } from "react";

type Referral = {
  id: number;
  companyName: string;
  companyEmail: string;
  status: string;
};

export default function Dashboard() {
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching referrals from backend
    setTimeout(() => {
      setReferrals([
        { id: 1, companyName: "Acme Corp", companyEmail: "info@acme.com", status: "Pending" },
        { id: 2, companyName: "Globex Inc", companyEmail: "contact@globex.com", status: "Rewarded" },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <section className="max-w-2xl mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-6 text-blue-900">Dashboard</h1>
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-semibold mb-2">Welcome, [User]</h2>
        <p className="mb-2">Here you can manage your company profile, view referrals, and track service requests.</p>
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-2">Referrals</h2>
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
