import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { email, password } = await request.json();
  // Here you would check credentials against a database
  // For now, just return a demo response
  if (email === "demo@cleanco.com" && password === "password") {
    return NextResponse.json({ success: true, message: "Login successful." });
  }
  return NextResponse.json({ success: false, message: "Invalid credentials." });
}
