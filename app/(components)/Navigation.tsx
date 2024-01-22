'use client';
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
import { signOut } from 'next-auth/react';

const Navigation = ({ user }: any) => {
  return (
    <nav className="flex justify-between bg-navigation p-4">
      <h2>Company XYZ Ticket System</h2>
      <div className="flex items-center space-x-4">
        {user && (
          <>
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
          </>
        )}
        <div className="flex items-center gap-2">
          {/* change this to image */}

          {user ? (
            <>
              <FontAwesomeIcon icon={faUser} className="icon" />
              <p className="text-default-text">{user.name}</p>
              <p
                className="cursor-pointer"
                onClick={() => signOut({ callbackUrl: '/User/Login' })}
              >
                Logout
              </p>
            </>
          ) : (
            <>
              <p className="text-default-text">
                <Link href="/User/NewUser">
                  <span>Register your Account</span>
                </Link>
              </p>
              <p className="text-default-text">
                <Link href="/User/Login">
                  <span>Login</span>
                </Link>
              </p>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
