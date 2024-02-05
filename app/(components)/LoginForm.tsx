'use client';
import { signIn } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
export interface LoginData {
  username: string;
  password: string;
}

const LoginForm = () => {
  const initialData: LoginData = {
    username: '',
    password: '',
  };
  const [formData, setFormData] = useState(initialData);
  const [hasError, setHasError] = useState(false);

  const handleChange = (e: any) => {
    const value = e.target.value;
    const name = e.target.name;
    setHasError(false);
    setFormData((prevState) => ({
      ...prevState,
      [name]: value, //update only the value of the name to the new value
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const res = await signIn('credentials', {
      username: formData.username,
      password: formData.password,
      //callbackUrl: '/', //redirect path
      redirect: false,
    });

    if (res?.status == 200) {
      window.location.href = '/'; //need this so navigation will refresh
    } else if (res?.error) {
      setHasError(true);
    }
  };
  return (
    <div className="flex justify-center">
      <div className="border-2 rounded-lg p-6 bg-form w-1/2">
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
          {hasError && <label>Incorrect Credentials</label>}
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
