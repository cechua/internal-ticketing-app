import mongoose, { Schema, Types } from 'mongoose';
import User, { UserType } from './User';
mongoose.connect(process.env.MONGODB_URI!);
mongoose.Promise = global.Promise;

type ID = Types.ObjectId;
export type NewTicketType = {
  _id?: string;
  category: string;
  title: string;
  description: string;
  priorityLevel: number;
  status: string;
  resolver: string;
  createdBy?: string;
  updatedAt?: string;
  updatedBy?: string;
};

export type TicketType = {
  _id?: string;
  category: string;
  title: string;
  description: string;
  priorityLevel: number;
  status: string;
  resolver: string;
  createdBy?: ID | UserType;
  updatedAt?: string;
  updatedBy?: ID | UserType;
};

const ticketSchema = new Schema(
  {
    category: String,
    title: String,
    description: String,
    priorityLevel: Number,
    status: String,
    resolver: String,
    createdBy: { type: Schema.Types.ObjectId, ref: User },
    updatedBy: { type: Schema.Types.ObjectId, ref: User },
  },
  {
    timestamps: true,
  }
);

const Ticket = mongoose.models.Ticket || mongoose.model('Ticket', ticketSchema);
export default Ticket;
