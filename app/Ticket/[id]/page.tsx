'use client';
import TicketForm from '@/app/(components)/TicketForm';
import { TicketType } from '@/app/(models)/Ticket';
import React, { useEffect, useState } from 'react';

const TicketPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const IS_UPDATE_MODE: boolean = id.toString().toLocaleLowerCase() !== 'new';
  const [ticket, setTicket] = useState<TicketType>();

  useEffect(() => {
    if (IS_UPDATE_MODE)
      fetch(`/api/Ticket/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setTicket(data.ticket);
        });
  }, [id, IS_UPDATE_MODE]);
  return <TicketForm updateMode={IS_UPDATE_MODE} ticketData={ticket} />;
};

export default TicketPage;
