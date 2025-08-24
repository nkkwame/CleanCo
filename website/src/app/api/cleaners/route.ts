import { NextResponse } from 'next/server';

const demoCleaners = [
  { id: 1, name: "Ama Mensah", age: 28, email: "ama@cleanco.com", contact: "+233 555 123 456" },
  { id: 2, name: "Kwesi Boateng", age: 35, email: "kwesi@cleanco.com", contact: "+233 555 654 321" },
];

export async function GET() {
  return NextResponse.json(demoCleaners);
}
