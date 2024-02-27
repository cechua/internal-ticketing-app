import React from 'react';
import DashboardCard from './DashboardCard';

interface DashboardProps {
  dashboardValues: {
    newTicketsCount: number;
    dueTicketsCount: number;
    pendingTicketsCount: number;
    assignedTicketsCount: number;
  };
}

const Dashboard = ({ dashboardValues }: DashboardProps) => {
  return (
    <div className="border-4 py-4 px-3 justify-between md:grid grid-cols-2 xl:grid-cols-4 gap-28">
      <DashboardCard
        cardDescription="New Tickets Created Today"
        count={dashboardValues.newTicketsCount}
        cardColor="bg-dashboard-new"
      />
      <DashboardCard
        cardDescription="Tickets Due Today"
        count={dashboardValues.dueTicketsCount}
        cardColor="bg-dashboard-due"
      />
      <DashboardCard
        cardDescription="Total Pending Tickets"
        count={dashboardValues.pendingTicketsCount}
        cardColor="bg-dashboard-pending"
      />
      <DashboardCard
        cardDescription="Tickets Assigned to You"
        count={dashboardValues.assignedTicketsCount}
        cardColor="bg-dashboard-assigned"
      />
    </div>
  );
};

export default Dashboard;
