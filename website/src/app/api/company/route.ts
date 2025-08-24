import { NextResponse } from 'next/server';

let companyProfiles: { email: string; name: string; address: string; phone: string; password: string }[] = [
  { email: "demo@cleanco.com", name: "Demo Company", address: "123 Clean St, Accra, Ghana", phone: "+233 555 000 111", password: "password" },
];

export async function GET(request: Request) {
  const url = new URL(request.url);
  const email = url.searchParams.get('email');
  const profile = companyProfiles.find(c => c.email === email);
  return NextResponse.json(profile || null);
}

export async function PUT(request: Request) {
  const { email, name, address, phone, password } = await request.json();
  let profile = companyProfiles.find(c => c.email === email);
  if (profile) {
    profile.name = name;
    profile.address = address;
    profile.phone = phone;
    if (password) profile.password = password;
    return NextResponse.json({ success: true, message: "Profile updated." });
  }
  return NextResponse.json({ success: false, message: "Company not found." });
}
