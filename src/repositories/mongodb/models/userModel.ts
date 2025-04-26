import mongoose, { Schema, Document } from "mongoose";

export interface IUserDocument extends Document {
  email: string;
  password: string;
  role: "admin" | "public" | "tourist";
  full_name: string;
  phone_number?: string;
  profile_picture?: string;
  address?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const userSchema: Schema = new Schema<IUserDocument>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true, enum: ["admin", "public", "tourist"] },
    full_name: { type: String, required: true },
    phone_number: { type: String },
    profile_picture: { type: String },
    address: { type: String },
  },
  { timestamps: true }
);

export const UserModel = mongoose.model<IUserDocument>("User", userSchema);
