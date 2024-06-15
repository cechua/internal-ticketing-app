'use client';
import Image from 'next/image';
import TicketCard from './(components)/TicketCard';
import Dashboard from './(components)/Dashboard';
import { useEffect, useState } from 'react';
import { TicketType } from './(models)/Ticket';
import { useSession } from 'next-auth/react';
import { UserRoles } from './(enums)/UserRoles';
import { Session } from 'next-auth';
import { Statuses } from './(enums)/Statuses';
import moment from 'moment';

export default function Home() {
  const { data: session } = useSession();
  const [tickets, setTickets] = useState<TicketType[]>();
  const [userTickets, setUserTickets] = useState<TicketType[]>();
  const [loading, setLoading] = useState(true);
  const [dashboardValues, setDashboardValues] = useState({
    newTicketsCount: 0,
    dueTicketsCount: 0,
    pendingTicketsCount: 0,
    assignedTicketsCount: 0,
  });

  const fetchUserTickets = (userId: string) => {
    fetch(`/api/Ticket?by=user&value=${userId}`)
      .then((res) => res.json())
      .then((data) => {
        setUserTickets(data.tickets);
        setLoading(false);
      });
  };

  useEffect(() => {
    const fetchTickets = () => {
      fetch('/api/Ticket')
        .then((res) => res.json())
        .then((data) => {
          setTickets(data.tickets);
          dashboardValuesHandler(data.tickets);
          setLoading(false);
        });
    };
    if (session && session?.user.role == UserRoles.USER) {
      fetchUserTickets(session.user.id);
    } else {
      fetchTickets();
    }
  }, [session]);

  const dashboardValuesHandler = (tickets: TicketType[]) => {
    const newTicketsCount = tickets.filter(
      (ticket) =>
        ticket.status == Statuses.NOT_STARTED &&
        moment(ticket.createdAt).isSame(new Date(), 'day')
    ).length;
    const dueTicketsCount = tickets.filter(
      (ticket) =>
        (ticket.priorityLevel == 1 &&
          moment(ticket.createdAt).isSameOrBefore(
            moment(new Date()).add(-5, 'days')
          )) ||
        (ticket.priorityLevel == 2 &&
          moment(ticket.createdAt).isSameOrBefore(
            moment(new Date()).add(-4, 'days')
          )) ||
        (ticket.priorityLevel == 3 &&
          moment(ticket.createdAt).isSameOrBefore(
            moment(new Date()).add(-3, 'days')
          )) ||
        (ticket.priorityLevel == 4 &&
          moment(ticket.createdAt).isSameOrBefore(
            moment(new Date()).add(-2, 'days')
          )) ||
        (ticket.priorityLevel == 5 &&
          moment(ticket.createdAt).isSameOrBefore(
            moment(new Date()).add(-1, 'days')
          ))
    ).length;
    const pendingTicketsCount = tickets.filter(
      (ticket) => ticket.status == Statuses.NOT_STARTED
    ).length;
    const assignedTicketsCount = tickets.filter(
      (ticket) => ticket.resolver == session?.user.id
    ).length;
    setDashboardValues({
      newTicketsCount: newTicketsCount,
      dueTicketsCount: dueTicketsCount,
      pendingTicketsCount: pendingTicketsCount,
      assignedTicketsCount: assignedTicketsCount,
    });
  };

  if (loading) {
    return <main>Loading</main>;
  }

  return (
    <main>
      {session &&
      (session.user?.role === UserRoles.ADMIN ||
        session.user?.role === UserRoles.RESOLVER) ? (
        <>
          <Dashboard dashboardValues={dashboardValues} />
          <div className="flex gap-2 mt-4 justify-between mx-4 flex-col md:flex-row">
            <div className="border-4 flex-1">
              <h4 className="text-black text-center">New Tickets</h4>

              {tickets &&
              tickets.filter((ticket) => ticket.status == Statuses.NOT_STARTED)
                .length > 0 ? (
                <div className="lg:grid grid-cols-1 xl:grid-cols-4">
                  {tickets
                    .filter((ticket) => ticket.status == Statuses.NOT_STARTED)
                    .map((ticket, i) => {
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
                <div className="text-center">No New Tickets</div>
              )}
            </div>
            <div className="border-4 flex-1">
              <h4 className="text-black text-center">
                Tickets Assigned to you
              </h4>
              <div className="lg:grid grid-cols-1 xl:grid-cols-4">
                {tickets &&
                  tickets
                    .filter((ticket) => ticket.resolver == session.user.id)
                    .map((ticket, i) => {
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
                  {userTickets
                    .filter((ticket) => ticket.status != Statuses.DONE)
                    .map((ticket, i) => {
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
                  {userTickets
                    .filter((ticket) => ticket.status == Statuses.DONE)
                    .map((ticket, i) => {
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
