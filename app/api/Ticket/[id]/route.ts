import Ticket, { TicketType } from '@/app/(models)/Ticket';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, { params }: any) {
  try {
    const { id } = params;
    const ticket = await Ticket.findOne({ _id: id });
    return NextResponse.json({ ticket }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error', error }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: any) {
  try {
    const { id } = params;
    const body = await req.json();
    const userData: TicketType = body.data;

    await Ticket.findByIdAndUpdate(id, {
      ...userData,
    });
    return NextResponse.json({ message: 'Ticket Updated' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error', error }, { status: 500 });
  }
}
