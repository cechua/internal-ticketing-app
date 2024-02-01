import React from 'react';
import DashboardCard from './DashboardCard';

const Dashboard = () => {
  return (
    <div className="border-4 py-4 px-3 justify-between md:grid grid-cols-2 xl:grid-cols-4 gap-28">
      <DashboardCard
        cardDescription="New Tickets Created Today"
        count={3}
        cardColor="bg-dashboard-new"
      />
      <DashboardCard
        cardDescription="Tickets Due Today"
        count={3}
        cardColor="bg-dashboard-due"
      />
      <DashboardCard
        cardDescription="Total Pending Tickets"
        count={3}
        cardColor="bg-dashboard-pending"
      />
      <DashboardCard
        cardDescription="Tickets Assigned to You"
        count={3}
        cardColor="bg-dashboard-assigned"
      />
    </div>
  );
};

export default Dashboard;
