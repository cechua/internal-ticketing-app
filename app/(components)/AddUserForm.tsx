'use client';
import React, { useEffect, useState } from 'react';
import { UserType } from '../(models)/User';
import PopupAlert from './PopupAlert';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Button from './Button';
import { UserRoles } from '../(enums)/UserRoles';

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

  const handleSubmit = async () => {
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

  const backToHomepage = () => {
    router.push('/');
  };

  return (
    <div className="flex justify-center">
      <div className=" border-2 rounded-lg p-6 bg-form m-6 w-full md:w-1/2 md:m-0">
        <form
          method="post"
          className="flex flex-col"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
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
            <option value={UserRoles.USER}>User</option>
            <option value={UserRoles.RESOLVER}>Resolver(Support)</option>
            <option value={UserRoles.ADMIN}>Admin</option>
          </select>

          <Button
            text="Create new user"
            isLoading={isSaving}
            onClickHandler={handleSubmit}
          />
        </form>
      </div>
      <PopupAlert
        visible={showModal}
        setVisibility={setShowModal}
        mainText="Account Successfully Created!"
        mainCTAText="Create another user"
        mainCTAHandler={() => setShowModal(false)}
        secondaryCTAText="Back to homepage"
        secondaryCTAHandler={backToHomepage}
      />
    </div>
  );
};

export default AddUserForm;
