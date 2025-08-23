import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const data = await request.json();
  // Here you would handle sending an email or saving to a database
  // For now, just return success
  return NextResponse.json({ success: true, message: "Contact request received.", data });
}
