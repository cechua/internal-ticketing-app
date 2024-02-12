'use client';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import { TicketType } from '../(models)/Ticket';
import Button from './Button';
import PopupAlert from './PopupAlert';
import { redirect, useRouter } from 'next/navigation';
import { Statuses } from '../(enums)/Statuses';
import { UserRoles } from '../(enums)/UserRoles';
import { UserType } from '../(models)/User';

interface TicketFormProps {
  updateMode: boolean;
  ticketData?: TicketType;
}
const TicketForm = (props: TicketFormProps) => {
  const router = useRouter();
  const { data: session } = useSession();
  const IS_UPDATE_MODE = props.updateMode;

  const initialData: TicketType = {
    category: 'Hardware Problem',
    title: '',
    description: '',
    priorityLevel: 1,
    status: 'Not Started',
    resolver: '',
    createdBy: undefined,
    updatedBy: undefined,
  };
  const [formData, setFormData] = useState(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModalPopup, setShowDeleteModalPopup] = useState(false);
  const [resolvers, setResolvers] = useState<UserType[]>();
  useEffect(() => {
    if (IS_UPDATE_MODE && props.ticketData) setFormData(props.ticketData);
  }, [IS_UPDATE_MODE, props.ticketData]);

  useEffect(() => {
    fetchResolvers();
  }, []);
  const handleChange = (e: any) => {
    const value = e.target.value;
    const name = e.target.name;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value, //update only the value of the name to the new value
    }));
  };

  const fetchResolvers = () => {
    fetch(`/api/User?role=${UserRoles.RESOLVER}`)
      .then((res) => res.json())
      .then((data) => {
        setResolvers(data.users);
      });
  };
  const handleSubmit = async () => {
    setIsLoading(true);
    if (!IS_UPDATE_MODE) {
      const res = await fetch('/api/Ticket/New', {
        method: 'POST',
        body: JSON.stringify({
          data: {
            ...formData,
            createdBy: session?.user?.id,
            updatedBy: session?.user?.id,
          },
        }),
      });
      if (!res.ok) {
        setIsLoading(false);
        throw new Error('Failed to create Ticket.');
      }
      setFormData(initialData);
      setShowModal(true);
      setIsLoading(false);
    } else {
      const res = await fetch(`/api/Ticket/${props.ticketData?._id}`, {
        method: 'PUT',
        body: JSON.stringify({
          data: { ...formData, updatedBy: session?.user?.id },
        }),
      });
      if (!res.ok) {
        setIsLoading(false);
        throw new Error('Failed to create Ticket.');
      }
      setShowModal(true);
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    setIsLoading(true);
    const res = await fetch(`/api/Ticket/${props.ticketData?._id}`, {
      method: 'DELETE',
    });
    if (!res.ok) {
      setIsLoading(false);
      throw new Error('Failed to delete Ticket.');
    }
    setFormData(initialData);
    setShowDeleteModalPopup(true);
    setIsLoading(false);
  };
  const backToHomepage = () => {
    router.push('/');
  };
  const createNewTicket = () => {
    router.push('/Ticket/New');
  };

  console.log(resolvers);
  return (
    <div className="flex justify-center">
      <div className="border-2 rounded-lg p-6 bg-form m-6 w-full md:w-1/2 md:m-0">
        <form
          method="post"
          className="flex flex-col"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <h2 className="text-center text-black">
            {!IS_UPDATE_MODE ? 'Create Your Ticket' : 'Update Ticket'}
          </h2>

          <label>Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            disabled={IS_UPDATE_MODE}
          >
            <option value="Hardware Problem">Hardware Problem</option>
            <option value="Software Problem">Software Problem</option>
            <option value="Network Problem">Network Problem</option>
          </select>
          <label>Title</label>
          <input
            type="text"
            id="title"
            name="title"
            onChange={handleChange}
            required
            value={formData.title}
            disabled={IS_UPDATE_MODE}
          />

          <label>Description</label>
          <textarea
            id="description"
            name="description"
            onChange={handleChange}
            required
            value={formData.description}
            rows={5}
            disabled={IS_UPDATE_MODE}
          />

          <label>Priority</label>
          <select
            name="priorityLevel"
            value={formData.priorityLevel}
            onChange={handleChange}
          >
            <option value={1}>1 - Very Low Priority</option>
            <option value={2}>2 - Low Priority</option>
            <option value={3}>3 - Normal Priority</option>
            <option value={4}>4 - High Priority</option>
            <option value={5}>5 - Critical Issue</option>
          </select>
          <label>Assign to:</label>

          <select
            name="resolver"
            value={formData.resolver}
            onChange={handleChange}
          >
            <option value={'Unassigned'}> </option>
            {resolvers &&
              resolvers.map((resolver, i) => (
                <option value={resolver._id} key={i}>
                  {resolver.username}
                </option>
              ))}
          </select>
          {/* // <input
          //   type="text"
          //   id="resolver"
          //   name="resolver"
          //   onChange={handleChange}
          //   value={formData.resolver}
          // /> */}
          <label>Status</label>
          <select name="status" value={formData.status} onChange={handleChange}>
            <option value={Statuses.NOT_STARTED}>Not Started</option>
            <option value={Statuses.IN_PROGRESS}>In Progress</option>
            <option value={Statuses.DONE}>Done</option>
          </select>
          <div className="flex justify-between">
            <Button
              text={!IS_UPDATE_MODE ? 'Create your Ticket' : 'Update Ticket'}
              onClickHandler={handleSubmit}
              isLoading={isLoading}
            />
            {IS_UPDATE_MODE && (
              <Button
                text={'Delete Ticket'}
                onClickHandler={handleDelete}
                isLoading={isLoading}
              />
            )}
          </div>
        </form>
        {/* Comment section for update mode - future feature i */}
        {/* <div className="flex flex-col mt-4">
          <textarea id="comment" name="comment" rows={5} />
          <button type="button" className="btn max-w-xs">
            Add Comment
          </button>
          <h3 className="text-black mt-3">Comments:</h3>
          <hr className="h-px border-0 bg-line my-2" />
          <div className="py-2">
            <div className="flex justify-between mb-2">
              <h5 className="font-bold">Username</h5>
              <span className="text-black">January 15,2023 10:50AM GMT+8</span>
            </div>

            <p className="text-black">This is being resolved</p>
          </div>
        </div> */}
        <PopupAlert
          visible={showModal}
          setVisibility={setShowModal}
          mainText={
            !IS_UPDATE_MODE ? 'Ticket Successfully Created!' : 'Ticket Updated!'
          }
          mainCTAText={
            !IS_UPDATE_MODE ? 'Create another ticket' : 'Back to homepage'
          }
          mainCTAHandler={
            !IS_UPDATE_MODE ? () => setShowModal(false) : backToHomepage
          }
        />
        <PopupAlert
          visible={showDeleteModalPopup}
          setVisibility={setShowDeleteModalPopup}
          mainText={'Ticket Successfully Deleted!'}
          mainCTAText={'Create new ticket'}
          mainCTAHandler={() => createNewTicket()}
          secondaryCTAText={'Back to homepage'}
          secondaryCTAHandler={() => backToHomepage}
        />
      </div>
    </div>
  );
};

export default TicketForm;
