import { User } from "../domain/userModel";
import { UserRepository } from "../domain/userRepository";

export class GetAllUser{
  constructor(readonly userRepository: UserRepository) {}

  async run(): Promise<User | null> {
    try {
      const user= await this.userRepository.getAllUser();
      return user;
    } catch (error) {
      return null;
    }
  }
}