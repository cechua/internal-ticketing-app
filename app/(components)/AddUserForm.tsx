'use client';
import React, { useState } from 'react';

interface UserData {
  email: string;
  username: string;
  role: string;
}
const AddUserForm = () => {
  const initialData: UserData = {
    email: '',
    username: '',
    role: 'User',
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
    const fullFormData = {
      ...formData,
      password: null,
      createdBy: 'adminusertemp',
      isSetupStep: true,
      active: true,
    };
    const res = await fetch('/api/User', {
      method: 'POST',
      body: JSON.stringify({ data: fullFormData }),
    });
    if (!res.ok) {
      throw new Error('Failed to create Ticket.');
    }
  };
  return (
    <div className="flex justify-center">
      <div className=" border-2 rounded-lg p-6 bg-form w-1/2">
        <form method="post" onSubmit={handleSubmit} className="flex flex-col">
          <h2 className="text-center text-black">Add New User</h2>

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
            id="username"
            name="username"
            onChange={handleChange}
            required
            value={formData.username}
          />

          <label>Role</label>
          <select name="role" value={formData.role} onChange={handleChange}>
            <option value="user">User</option>
            <option value="resolver">Resolver(Support)</option>
          </select>

          <button type="submit" className="btn max-w-xs">
            Create new User
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddUserForm;
