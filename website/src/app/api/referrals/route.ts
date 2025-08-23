import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { referrerEmail, companyName, companyEmail } = await request.json();
  // Here you would save the referral to a database
  // For now, just return a demo response
  if (!referrerEmail || !companyName || !companyEmail) {
    return NextResponse.json({ success: false, message: "All fields are required." });
  }
  return NextResponse.json({ success: true, message: "Referral submitted." });
}
