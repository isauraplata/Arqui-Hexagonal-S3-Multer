import mongoose from "mongoose";
import { User } from "../domain/userModel";
import { UserRepository } from "../domain/userRepository";
import { IUser, UserModel } from "./userSchema";

export class MongodbUserRepository implements UserRepository {
  async getAllUser(): Promise<any> {
    try {
      const users = await UserModel.find().exec();
      return users.map(this.userToEntity);
    } catch (error) {
      console.error(`Error retrieving all users: ${error}`);
      return [];
    }
  }
  private userToEntity(user: IUser): User {
    return new User(user._id.toString(), user.name, user.email, user.password);
  }

  async createUser(
    name: string,
    email: string,
    password: string
  ): Promise<User | null> {
    try {
      console.log("Attempting to create user:", { name, email });
      const savedUser = await UserModel.create({ name, email, password });
      console.log("User saved successfully:", savedUser);
      return this.userToEntity(savedUser);
    } catch (error) {
      console.error(`Error creating user: ${error}`);
      throw error;
    }
  }

  async deleteUser(id: string): Promise<boolean> {
    try {
      const result = await UserModel.deleteOne({
        _id: new mongoose.Types.ObjectId(id),
      }).exec();
      return result.deletedCount !== 0;
    } catch (error) {
      console.error(`Error deleting user: ${error}`);
      return false;
    }
  }

  async updateUser(
    id: string,
    name: string,
    email: string,
    password: string
  ): Promise<boolean> {
    try {
      const result = await UserModel.updateOne(
        { _id: new mongoose.Types.ObjectId(id) },
        { name, email, password }
      ).exec();
      return result.modifiedCount > 0;
    } catch (error) {
      console.error(`Error updating user: ${error}`);
      return false;
    }
  }

  async loginUser(email: string, password: string): Promise<User | null> {
    try {
      const user = await UserModel.findOne({ email, password }).exec();
      return user ? this.userToEntity(user) : null;
    } catch (error) {
      console.error(`Error logging in user: ${error}`);
      return null;
    }
  }
}
