import { LoginData } from '@/app/(components)/LoginForm';
import User from '@/app/(models)/User';
import { isSamePass } from '@/app/(utils)/hashPass';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const userData: LoginData = body.data;

    const user = await User.findOne({
      $or: [{ username: userData.username }, { email: userData.username }],
    });
    if (user) {
      const isCorrectPassword = await isSamePass(
        userData.password,
        user.password
      );
      const responseData = {
        id: user._id,
        username: user.username,
        email: user.email,
      };
      if (isCorrectPassword) {
        return NextResponse.json(
          { data: responseData, message: 'Login Success' },
          { status: 200 }
        );
      } else {
        return NextResponse.json(
          { message: 'Incorrect Credentials' },
          { status: 401 }
        );
      }
    } else {
      return NextResponse.json({ message: 'User not found' }, { status: 401 });
    }
  } catch (error) {
    return NextResponse.json({ message: 'Error', error }, { status: 500 });
  }
}
