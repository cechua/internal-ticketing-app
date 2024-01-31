import React from 'react';
import Link from 'next/link';
import { TicketType } from '../(models)/Ticket';
const TicketCard = (ticket: TicketType) => {
  console.log('here?');
  console.log(ticket.category);
  return (
    <div className="flex flex-col bg-card hover:bg-card-hover rounded-md shadow-lg p-3 m-2">
      <Link href={`/Ticket/${ticket._id}`} style={{ display: 'contents' }}>
        <h4 className="text-center">{ticket.category}</h4>
        <div className="flex justify-between">
          <h4>{ticket.title}</h4>
        </div>
        <hr className="h-px border-0 bg-line mt-2" />
        <p className="whitespace-pre-wrap py-4">{ticket.description}</p>
        <hr className="h-px border-0 bg-line" />
        <div className="flex justify-between">
          <div>
            <span>Requestor: {ticket.createdBy}</span>
          </div>
          <div>
            {ticket.status.toLocaleLowerCase() !== 'not started' ? (
              <span>
                {ticket.status} by {ticket.resolver}
              </span>
            ) : (
              <span>Status: Open</span>
            )}
          </div>
        </div>
        <div className="ml-auto flex items-end">
          <span>last updated {ticket.updatedAt}</span>
        </div>
      </Link>
    </div>
  );
};

export default TicketCard;
