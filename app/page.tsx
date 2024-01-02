import Image from 'next/image';
import TicketCard from './(components)/TicketCard';

export default function Home() {
  return (
    <main>
      <div className="lg:grid grid-cols-2 xl:grid-cols-4">
        <TicketCard />
      </div>
    </main>
  );
}
