import Image from 'next/image';
import TicketCard from './(components)/TicketCard';
import Dashboard from './(components)/Dashboard';

export default function Home() {
  return (
    <main>
      <Dashboard />
      <div className="flex gap-2 mt-4">
        <div className="border-4">
          <h4 className="text-black text-center">New Tickets</h4>
          <div className="lg:grid grid-cols-1 xl:grid-cols-3">
            <TicketCard />
            <TicketCard />
            <TicketCard />
            <TicketCard />
            <TicketCard />
          </div>
        </div>
        <div className="border-4">
          <h4 className="text-black text-center">Tickets Assigned to you</h4>
          <div className="lg:grid grid-cols-1 xl:grid-cols-3">
            <TicketCard />
            <TicketCard />
          </div>
        </div>
      </div>
    </main>
  );
}
