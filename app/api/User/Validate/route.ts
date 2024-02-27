import User from '@/app/(models)/User';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const email = req.nextUrl.searchParams.get('email');
    const username = req.nextUrl.searchParams.get('username');
    if (email && username) {
      const user = await User.findOne({
        $or: [{ username: username }, { email: email }],
      }).select('_id');
      if (user != null) {
        return NextResponse.json({ exists: true }, { status: 200 });
      }
      return NextResponse.json({ exists: false }, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json({ message: 'Error', error }, { status: 500 });
  }
}
