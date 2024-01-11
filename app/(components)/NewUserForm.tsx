'use client';
import React, { useState } from 'react';

import bcrypt from 'bcryptjs';
import { hashPass, isSamePass } from '../(utils)/hashPass';
import { UserType } from '../(models)/User';
interface NewUserData {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}
const NewUserForm = () => {
  const initialData: NewUserData = {
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  };
  const [formData, setFormData] = useState(initialData);

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
    const hashedPassword = await hashPass(formData.password);
  };

  return (
    <div className="flex justify-center">
      <div className=" border-2 rounded-lg p-6 bg-form w-1/2">
        <form method="post" onSubmit={handleSubmit} className="flex flex-col">
          <h2 className="text-center text-black">Register your Account</h2>
          <label>Email</label>
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          ></input>
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
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
          <button type="submit" className="btn max-w-xs">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewUserForm;
