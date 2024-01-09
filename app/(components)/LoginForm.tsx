'use client';
import React, { useEffect, useState } from 'react';

interface LoginData {
  username: string;
  password: string;
}

const getUsers = async () => {
  try {
    const res = await fetch('http://localhost:3000/api/User/Login', {
      cache: 'no-cache',
    });

    return res.json();
  } catch (error) {
    console.log('Failed to get tickets', error);
  }
};

const LoginForm = () => {
  const initialData: LoginData = {
    username: '',
    password: '',
  };
  const [formData, setFormData] = useState(initialData);
  const [users, setUsers] = useState([]);
  const getUsersList = async () => {
    const { users } = await getUsers();
    setUsers(users);
  };

  useEffect(() => {
    getUsersList();
  }, []);
  console.log(users);
  const handleChange = (e: any) => {
    const value = e.target.value;
    const name = e.target.name;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value, //update only the value of the name to the new value
    }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
  };
  return (
    <div className="flex justify-center">
      <div className=" border-2 rounded-lg p-6 bg-form w-1/2">
        <form method="post" onSubmit={handleSubmit} className="flex flex-col">
          <h2 className="text-center text-black">Login</h2>

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

          <button type="submit" className="btn max-w-xs">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;