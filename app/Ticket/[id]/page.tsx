import TicketForm from '@/app/(components)/TicketForm';
import React from 'react';

const TicketPage = (id: number | string) => {
  const IS_UPDATE_MODE: boolean = id.toString().toLocaleLowerCase() !== 'new';

  return <TicketForm updateMode={IS_UPDATE_MODE} />;
};

export default TicketPage;
