import TicketForm from '@/app/(components)/TicketForm';
import React from 'react';

const TicketPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const IS_UPDATE_MODE: boolean = id.toString().toLocaleLowerCase() !== 'new';

  return <TicketForm updateMode={IS_UPDATE_MODE} />;
};

export default TicketPage;
