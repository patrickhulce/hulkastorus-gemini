import { NextResponse } from 'next/server';

export async function GET() {
  // Placeholder for destroying session token
  // This will be implemented with NextAuth later
  console.log('Logout route hit: Session token would be destroyed here.');

  // Redirect to homepage or login page after logout
  return NextResponse.redirect(new URL('/login', process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'));
}
