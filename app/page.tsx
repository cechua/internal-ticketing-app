'use client';
import Image from 'next/image';
import TicketCard from './(components)/TicketCard';
import Dashboard from './(components)/Dashboard';
import { useEffect, useState } from 'react';
import { TicketType } from './(models)/Ticket';
import { useSession } from 'next-auth/react';
import { UserRoles } from './(enums)/UserRoles';
import { Session } from 'next-auth';

export default function Home() {
  const { data: session } = useSession();
  const [tickets, setTickets] = useState<TicketType[]>();
  const [userTickets, setUserTickets] = useState<TicketType[]>();
  const [loading, setLoading] = useState(true);

  const fetchTickets = () => {
    fetch('/api/Ticket')
      .then((res) => res.json())
      .then((data) => {
        setTickets(data.tickets);
        setLoading(false);
      });
  };

  const fetchUserTickets = (userId: string) => {
    fetch(`/api/Ticket?by=user&value=${userId}`)
      .then((res) => res.json())
      .then((data) => {
        setUserTickets(data.tickets);
        setLoading(false);
      });
  };

  useEffect(() => {
    if (session && session?.user) {
      fetchUserTickets(session.user.id);
    } else {
      fetchTickets();
    }
  }, [session]);

  if (loading) {
    return <main>Loading</main>;
  }
  return (
    <main>
      {session &&
      (session.user?.role === UserRoles.ADMIN ||
        session.user?.role === UserRoles.RESOLVER) ? (
        <>
          <Dashboard />
          <div className="flex gap-2 mt-4 justify-between mx-4">
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
                        updatedBy={ticket.updatedBy}
                      />
                    );
                  })}
              </div>
            </div>
            <div className="border-4">
              <h4 className="text-black text-center">
                Tickets Assigned to you
              </h4>
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
                        updatedBy={ticket.updatedBy}
                      />
                    );
                  })}
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="flex gap-2 mt-4 justify-between mx-4 flex-col md:flex-row">
            <div className="border-4 flex-1">
              <h4 className="text-black text-center">Pending Tickets</h4>
              {userTickets && userTickets?.length > 0 ? (
                <div className="lg:grid grid-cols-2 xl:grid-cols-3">
                  {userTickets.map((ticket, i) => {
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
                        updatedBy={ticket.updatedBy}
                      />
                    );
                  })}
                </div>
              ) : (
                <div className="text-center">No Pending Tickets</div>
              )}
            </div>
            <div className="border-4 flex-1">
              <h4 className="text-black text-center">Complated Tickets</h4>

              {userTickets && userTickets?.length > 0 ? (
                <div className="lg:grid grid-cols-2 xl:grid-cols-3">
                  {userTickets.map((ticket, i) => {
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
                        updatedBy={ticket.updatedBy}
                      />
                    );
                  })}
                </div>
              ) : (
                <div className="text-center">No Completed Tickets</div>
              )}
            </div>
          </div>
        </>
      )}
    </main>
  );
}
