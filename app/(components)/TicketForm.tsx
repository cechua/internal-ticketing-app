'use client';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import { TicketType } from '../(models)/Ticket';

interface TicketFormProps {
  updateMode: boolean;
  ticketData?: TicketType;
}
const TicketForm = (props: TicketFormProps) => {
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

  useEffect(() => {
    if (IS_UPDATE_MODE && props.ticketData) setFormData(props.ticketData);
  }, [IS_UPDATE_MODE, props.ticketData]);

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
        throw new Error('Failed to create Ticket.');
      }
      setFormData(initialData);
    } else {
      const res = await fetch(`/api/Ticket/${props.ticketData?._id}`, {
        method: 'PUT',
        body: JSON.stringify({
          data: { ...formData, updatedBy: session?.user?.id },
        }),
      });
      if (!res.ok) {
        throw new Error('Failed to create Ticket.');
      }
    }
  };
  return (
    <div className="flex justify-center">
      <div className=" border-2 rounded-lg p-6 bg-form w-1/2">
        <form method="post" onSubmit={handleSubmit} className="flex flex-col">
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
          <input
            type="text"
            id="resolver"
            name="resolver"
            onChange={handleChange}
            value={formData.resolver}
          />
          <label>Status</label>
          <select name="status" value={formData.status} onChange={handleChange}>
            <option value="Not Started">Not Started</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
          <button type="submit" className="btn max-w-xs">
            {!IS_UPDATE_MODE ? 'Create your Ticket' : 'Update Ticket'}
          </button>
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
      </div>
    </div>
  );
};

export default TicketForm;
