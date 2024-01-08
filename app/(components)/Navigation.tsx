import Link from 'next/link';
import React from 'react';
import {
  faCheckSquare,
  faHome,
  faList,
  faTicket,
  faUser,
  faUserPlus,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const Navigation = () => {
  return (
    <nav className="flex justify-between bg-navigation p-4">
      <h2>Company XYZ Ticket System</h2>
      <div className="flex items-center space-x-4">
        <Link href="/" className="flex items-center gap-2">
          <FontAwesomeIcon icon={faHome} className="icon" />
          <span>Home</span>
        </Link>
        <Link href="/Ticket/new" className="flex items-center gap-2">
          <FontAwesomeIcon icon={faTicket} className="icon" />
          <span>Create New Ticket</span>
        </Link>
        <Link href="/User/AddUser" className="flex items-center gap-2">
          <FontAwesomeIcon icon={faUserPlus} className="icon" />
          <span>Create New User</span>
        </Link>
        {/* <Link
          href="/TicketDashboard/approval"
          className="flex items-center gap-2"
        >
          <FontAwesomeIcon icon={faCheckSquare} className="icon" />
          <span>Tickets for Approval</span>
        </Link> */}
        <div className="flex items-center gap-2">
          {/* change this to image */}
          <FontAwesomeIcon icon={faUser} className="icon" />
          {/* change this to currently logged in user, Get from session state or local/sessions storage? */}
          <p className="text-default-text">Test User</p>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
