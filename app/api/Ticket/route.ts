import Ticket from '@/app/(models)/Ticket';
import { NextRequest, NextResponse } from 'next/server';
export async function GET(req: NextRequest) {
  try {
    const getBy = req.nextUrl.searchParams.get('by');
    const getByValue = req.nextUrl.searchParams.get('value');
    if (getBy && getByValue) {
      const tickets = await Ticket.find({
        createdBy: getByValue,
      })
        .populate('createdBy', '_id username firstName lastName')
        .populate('updatedBy', '_id username firstName lastName');
      return NextResponse.json({ tickets }, { status: 200 });
    } else {
      const tickets = await Ticket.find()
        .populate('createdBy', '_id username firstName lastName')
        .populate('updatedBy', '_id username firstName lastName');
      return NextResponse.json({ tickets }, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json({ message: 'Error', error }, { status: 500 });
  }
}
