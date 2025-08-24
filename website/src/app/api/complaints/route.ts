import { NextResponse } from 'next/server';

let complaints: { email: string; message: string; date: string }[] = [];

export async function POST(request: Request) {
  const { email, message } = await request.json();
  const date = new Date().toISOString();
  complaints.push({ email, message, date });
  return NextResponse.json({ success: true, message: "Complaint submitted." });
}

export async function GET() {
  return NextResponse.json(complaints);
}
