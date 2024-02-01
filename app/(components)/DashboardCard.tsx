import React from 'react';

interface DashboardCardProps {
  cardDescription: string;
  count: number;
  cardColor: string;
}
const DashboardCard = (details: DashboardCardProps) => {
  return (
    <div
      className={`flex flex-col ${details.cardColor} p-2 rounded-lg min-h-28 min-w-60 gap-4`}
    >
      <span className="text-black text-center">{details.cardDescription}</span>
      <h6 className="text-center text-3xl">{details.count}</h6>
    </div>
  );
};

export default DashboardCard;
