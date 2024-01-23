import mongoose, { Schema } from 'mongoose';
mongoose.connect(process.env.MONGODB_URI!);
mongoose.Promise = global.Promise;

export type TicketType = {
  category: string;
  title: string;
  description: string;
  priorityLevel: number;
  status: string;
  resolver: string;
  createdBy: string;
};

const ticketSchema = new Schema(
  {
    category: String,
    title: String,
    description: String,
    priorityLevel: Number,
    status: String,
    resolver: String,
    createdBy: String,
  },
  {
    timestamps: true,
  }
);

const Ticket = mongoose.models.Ticket || mongoose.model('Ticket', ticketSchema);
export default Ticket;
