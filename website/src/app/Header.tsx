"use client";
import { useAuth } from "./AuthContext";

export default function Header() {
  const { user, logout } = useAuth();
  return (
    <header className="bg-blue-900 text-white py-4">
      <nav className="container mx-auto flex justify-between items-center px-4">
        <div className="font-bold text-xl">CleanCo</div>
        <ul className="flex gap-6 items-center">
          <li><a href="/" className="hover:underline">Home</a></li>
          <li><a href="/services" className="hover:underline">Services</a></li>
          <li><a href="/contact" className="hover:underline">Contact</a></li>
          <li><a href="/dashboard" className="hover:underline">Dashboard</a></li>
          <li><a href="/referrals" className="hover:underline">Referrals</a></li>
          <li><a href="/register" className="hover:underline">Register</a></li>
          <li><a href="/login" className="hover:underline">Login</a></li>
          {user && (
            <>
              <li className="ml-4 text-sm">Logged in as <span className="font-semibold">{user.email}</span></li>
              <li><button onClick={logout} className="bg-white text-blue-900 px-3 py-1 rounded font-bold">Logout</button></li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}
