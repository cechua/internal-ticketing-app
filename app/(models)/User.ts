import mongoose, { Schema } from 'mongoose';
mongoose.connect(process.env.MONGODB_URI!);
mongoose.Promise = global.Promise;

export type UserType = {
  email: string;
  username: string;
  password: string;
  role: string;
  createdBy: string;
  isSetupStep: Boolean;
  active: Boolean;
};

const userSchema = new Schema(
  {
    email: String,
    username: String,
    password: String,
    role: String,
    createdBy: String,
    isSetupStep: Boolean,
    active: Boolean,
  },
  {
    timestamps: true,
  }
);

const User = mongoose.models.User || mongoose.model('User', userSchema);
export default User;
