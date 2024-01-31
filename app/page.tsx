'use client';
import Image from 'next/image';
import TicketCard from './(components)/TicketCard';
import Dashboard from './(components)/Dashboard';
import { useEffect, useState } from 'react';
import { TicketType } from './(models)/Ticket';

export default function Home() {
  const [tickets, setTickets] = useState<TicketType[]>();
  const [loading, setLoading] = useState(true);

  const fetchTickets = () => {
    fetch('/api/Ticket')
      .then((res) => res.json())
      .then((data) => {
        setTickets(data.tickets);
        setLoading(false);
      });
  };
  useEffect(() => {
    fetchTickets();
  }, []);

  if (loading) {
    return <main>Loading</main>;
  }

  return (
    <main>
      <Dashboard />
      <div className="flex gap-2 mt-4">
        <div className="border-4">
          <h4 className="text-black text-center">New Tickets</h4>
          <div className="lg:grid grid-cols-1 xl:grid-cols-3">
            {tickets &&
              tickets.map((ticket, i) => {
                return (
                  <TicketCard
                    key={ticket._id}
                    _id={ticket._id}
                    category={ticket.category}
                    title={ticket.title}
                    description={ticket.description}
                    priorityLevel={ticket.priorityLevel}
                    status={ticket.status}
                    resolver={ticket.resolver}
                    createdBy={ticket.createdBy}
                    updatedAt={ticket.updatedAt}
                  />
                );
              })}
          </div>
        </div>
        <div className="border-4">
          <h4 className="text-black text-center">Tickets Assigned to you</h4>
          {/* <div className="lg:grid grid-cols-1 xl:grid-cols-3">
            <TicketCard />
            <TicketCard />
          </div> */}
        </div>
      </div>
    </main>
  );
}
