import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { email, password, company } = await request.json();
  // Here you would save the user to a database
  // For now, just return a demo response
  if (!email || !password || !company) {
    return NextResponse.json({ success: false, message: "All fields are required." });
  }
  return NextResponse.json({ success: true, message: "Registration successful." });
}
