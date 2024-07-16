import { User } from "../domain/userModel";
import { UserRepository } from "../domain/userRepository";

export class UpdateUser{
  constructor(readonly userRepository: UserRepository) {}

  async run(
    id: string,
    name: string, 
    email: string, 
    password: string
  ): Promise<User | null> {
    try {
      const user= await this.userRepository.updateUser(id, name, email, password);
      return user;
    } catch (error) {
      return null;
    }
  }
}