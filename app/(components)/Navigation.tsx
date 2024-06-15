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
import { User } from 'next-auth';
import { UserRoles } from '../(enums)/UserRoles';

interface NavigationProps {
  user: User;
}

const Navigation = ({ user }: NavigationProps) => {
  return (
    <nav className="flex justify-between bg-navigation p-4  flex-col lg:flex-row">
      <h2 className="mb-4 lg:m-0">Ticket System</h2>
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
            {user.role === UserRoles.ADMIN && (
              <Link href="/User/AddUser" className="flex items-center gap-2">
                <FontAwesomeIcon icon={faUserPlus} className="icon" />
                <span>Create New User</span>
              </Link>
            )}
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
              <p className="text-default-text border-r-2 px-3">
                <Link href="/User/NewUser">
                  <span>Activate your account</span>
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
