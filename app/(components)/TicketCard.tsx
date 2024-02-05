import React from 'react';
import Link from 'next/link';
import { TicketType } from '../(models)/Ticket';
import { UserType } from '../(models)/User';
import moment from 'moment';
const TicketCard = (ticket: TicketType) => {
  const requestor = ticket.createdBy as UserType;
  const updatedBy = ticket.updatedBy as UserType;
  return (
    <div className="flex flex-col bg-card hover:bg-card-hover rounded-md shadow-lg p-3 m-2 w-96 h-60">
      <Link href={`/Ticket/${ticket._id}`} style={{ display: 'contents' }}>
        <div>
          <h4 className="text-center">{ticket.category}</h4>
          <div className="flex justify-between">
            <h4>{ticket.title}</h4>
          </div>
          <hr className="h-px border-0 bg-line mt-2" />
        </div>
        <div className="h-24">
          <p className="whitespace-pre-wrap py-4">{ticket.description}</p>
        </div>
        <hr className="h-px border-0 bg-line" />
        <div className="h-16 flex flex-col justify-between">
          <div className="flex flex-col justify-between">
            <div className="flex justify-between">
              <div>
                <span>Requestor: {requestor.username}</span>
              </div>
              <div>
                {ticket.status.toLocaleLowerCase() !== 'not started' ? (
                  <span>
                    {ticket.status} by {updatedBy?.username}
                  </span>
                ) : (
                  <span>Status: Open</span>
                )}
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <span>
              last updated{' '}
              {moment(ticket.updatedAt).format('MM/DD/YYYY, h:mm:ss a')}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default TicketCard;
