'use client';
import React, { useEffect, useState } from 'react';
import { UserType } from '../(models)/User';
import PopupAlert from './PopupAlert';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

interface UserData {
  email: string;
  username: string;
  role: string;
}

const AddUserForm = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const initialData: UserData = {
    email: '',
    username: '',
    role: 'User',
  };
  const [formData, setFormData] = useState(initialData);
  const [showModal, setShowModal] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
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
    setIsSaving(true);
    /*Add email and username duplicate checking */
    const fullFormData: UserType = {
      ...formData,
      firstName: '',
      lastName: '',
      password: '',
      createdBy: session?.user?.id,
      isSetupStep: true,
      active: true,
    };
    const res = await fetch('/api/User', {
      method: 'POST',
      body: JSON.stringify({ data: fullFormData }),
    });
    if (!res.ok) {
      throw new Error('Failed to create Ticket.');
    } else {
      setShowModal(true);
      setFormData(initialData);
      setIsSaving(false);
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const backToHomepage = () => {
    router.push('/');
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
            <option value="resolver">Admin</option>
          </select>

          <button type="submit" className="btn max-w-xs">
            {!isSaving ? (
              'Create new User '
            ) : (
              <div className="text-center">
                <div role="status">
                  <svg
                    aria-hidden="true"
                    className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
            )}
          </button>
        </form>
      </div>
      <PopupAlert
        visible={showModal}
        setVisibility={setShowModal}
        mainText="Account Successfully Created!"
        mainCTAText="Create another user"
        mainCTAHandler={closeModal}
        secondaryCTAText="Back to homepage"
        secondaryCTAHandler={backToHomepage}
      />
    </div>
  );
};

export default AddUserForm;
