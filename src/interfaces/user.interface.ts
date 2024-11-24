import { Document, Types } from "mongoose"

export interface User extends Document {
  _id: Types.ObjectId;
  email: string;
  name: string;
  password: string;
  rule?: number;
  photoUrl?: string;
  createdAt?: number;
  updatedAt?: number;
}