'use client';
import React, { useState } from 'react';
import { hashPass } from '../(utils)/hashPass';
import { UserType } from '../(models)/User';
interface UserData extends UserType {
  id: string;
  confirmPassword: string;
}
const NewUserForm = () => {
  const initialData: UserData = {
    id: '',
    email: '',
    username: '',
    firstName: '',
    lastName: '',
    password: '',
    confirmPassword: '',
    role: '',
    createdBy: '',
    isSetupStep: true,
    active: true,
  };
  const [formData, setFormData] = useState(initialData);
  const [passwordSetup, setPasswordSetup] = useState(false);

  const checkUser = async () => {
    const res = await fetch(`/api/User?email=${formData.email}`, {
      method: 'GET',
      cache: 'no-cache',
    });
    if (!res.ok) {
      throw new Error('Failed to get');
    }
    return res.json();
  };

  const handleCheckUser = async () => {
    const { users } = await checkUser();
    if (users) {
      setPasswordSetup(true);
      setFormData((prevState) => ({
        ...prevState,
        ['username']: users.username,
        ['id']: users._id,
        ['role']: users.role,
        ['createdBy']: users.createdBy,
        ['isSetupStep']: false, //false once updated as password is inputted
        ['active']: true,
      }));
    }
  };
  const handleChange = (e: any) => {
    const value = e.target.value;
    const name = e.target.name;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value, //update only the value of the name to the new value
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    //add password policy
    if (
      formData.password !== formData.confirmPassword &&
      formData.password !== ''
    ) {
      alert('Password is not same'); //replace this to message box
    } else {
      const hashedPassword = await hashPass(formData.password);
      const updatedData: UserType = {
        ...formData,
        password: hashedPassword,
      };
      const res = await fetch(`/api/User/${formData.id}`, {
        method: 'PUT',
        body: JSON.stringify({ data: updatedData }),
      });
      if (!res.ok) {
        throw new Error('Failed to update your Ticket.');
      } else {
        setFormData(initialData);
      }
    }
  };
  //ADD enter functionality on below
  return (
    <div className="flex justify-center">
      <div className=" border-2 rounded-lg p-6 bg-form w-1/2">
        <form method="post" className="flex flex-col">
          <h2 className="text-center text-black">Register your Account</h2>
          <label>Email</label>
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            disabled={passwordSetup}
          ></input>
          {!passwordSetup && (
            <button
              type="button"
              className="btn max-w-xs"
              onClick={handleCheckUser}
            >
              Find Account
            </button>
          )}
          {passwordSetup && (
            <>
              <label>Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                disabled={passwordSetup}
              ></input>
              <label>First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
              ></input>
              <label>Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
              ></input>
              <label>Password</label>
              <input
                type="password"
                id="password"
                name="password"
                onChange={handleChange}
                required
                value={formData.password}
              />
              <label>Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                onChange={handleChange}
                required
                value={formData.confirmPassword}
              />
              <button
                type="button"
                className="btn max-w-xs"
                onClick={handleSubmit}
              >
                Register
              </button>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default NewUserForm;
