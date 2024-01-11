import User, { UserType } from '@/app/(models)/User';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(req: NextRequest, { params }: any) {
  try {
    const { id } = params;
    const body = await req.json();
    const userData: UserType = body.data;

    await User.findByIdAndUpdate(id, {
      ...userData,
    });
    return NextResponse.json(
      { message: 'Account Registered' },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: 'Error', error }, { status: 500 });
  }
}

// export async function PUT(req, { params }) {
//   try {
//     const { id } = params;
//     const body = await req.json();
//     const ticketData = body.formData;
//     const updateTicketData = await Ticket.findByIdAndUpdate(id, {
//       ...ticketData,
//     });
//     return NextResponse.json({ message: 'Ticket Updated' }, { status: 201 });
//   } catch (error) {
//     return NextResponse.json({ message: 'Error', error }, { status: 500 });
//   }
// }
// export async function POST(req: NextRequest) {
//   try {
//     const body = await req.json();
//     const userData: UserType = body.data;

//     await User.create(userData);
//     return NextResponse.json({ message: 'User Created' }, { status: 200 });
//   } catch (error) {
//     return NextResponse.json({ message: 'Error', error }, { status: 500 });
//   }
// }
