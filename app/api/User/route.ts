import User, { UserType } from '@/app/(models)/User';
import { NextApiRequest } from 'next';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const email = req.nextUrl.searchParams.get('email');
    const role = req.nextUrl.searchParams.get('role');
    if (email) {
      const user = await User.findOne({ email: email, isSetupStep: true });
      return NextResponse.json({ user }, { status: 200 });
    } else if (role) {
      const users = await User.find({ role: role }).select(
        '_id username firstName lastName'
      );
      return NextResponse.json({ users }, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json({ message: 'Error', error }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const userData: UserType = body.data;

    await User.create(userData);
    return NextResponse.json({ message: 'User Created' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error', error }, { status: 500 });
  }
}
