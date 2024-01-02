import React from 'react';
import Link from 'next/link';
const TicketCard = () => {
  const ticket: any = {
    title: 'Test Title',
    description: 'Test description',
    category: 'Hardware Problem',
  };
  return (
    <div className="flex flex-col bg-card hover:bg-card-hover rounded-md shadow-lg p-3 m-2">
      <Link href={`/TicketPage/${ticket._id}`} style={{ display: 'contents' }}>
        <div className="flex justify-between">
          <h4>{ticket.title}</h4>
          <h4>{ticket.category}</h4>
        </div>
        <hr className="h-px border-0 bg-line mb-2" />
        <p className="whitespace-pre-wrap py-4">{ticket.description}</p>
        <hr className="h-px border-0 bg-line mb-2" />
        <div className="flex justify-between">
          <div>
            <span>Approved by: image + name</span>
          </div>
          <div>
            <span>Status by UserName</span>
          </div>
        </div>
        <div className="ml-auto flex items-end">
          <span>last updated xxxxx</span>
        </div>
      </Link>
    </div>
  );
};

export default TicketCard;