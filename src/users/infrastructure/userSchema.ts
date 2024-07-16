//userSchema.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
    _id: any;
    name: string;
    email: string;
    password: string;
}

const userSchema = new Schema<IUser>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
}, { timestamps: true });

export const UserModel = mongoose.model<IUser>('User', userSchema);