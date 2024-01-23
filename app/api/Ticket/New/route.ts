import Ticket, { TicketType } from '@/app/(models)/Ticket';
import { authOptions } from '@/app/(server)/auth';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (session) {
      const body = await req.json();
      const ticketData: TicketType = body.data;
      console.log(ticketData);
      await Ticket.create(ticketData);
      return NextResponse.json({ message: 'Ticket  Created' }, { status: 200 });
    } else {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
  } catch (error) {
    return NextResponse.json({ message: 'Error', error }, { status: 500 });
  }
}
