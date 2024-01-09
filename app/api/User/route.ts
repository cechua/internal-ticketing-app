import User from '@/app/(models)/User';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const users = await User.find();
    return NextResponse.json({ users }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error', error }, { status: 500 });
  }
}

export async function POST(req: any) {
  try {
    const body = await req.json();
    const userData = body.data;
    console.log(userData);
    await User.create(userData);
    return NextResponse.json({ message: 'User Created' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error', error }, { status: 500 });
  }
}
