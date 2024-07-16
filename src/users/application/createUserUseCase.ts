import { User } from "../domain/userModel";
import { UserRepository } from "../domain/userRepository";

export class CreateUser{
  constructor(readonly userRepository: UserRepository) {}

  async run(
    name: string,
    email: string,
    password: string
  ): Promise<User | null> {
    try {
      const user= await this.userRepository.createUser(name,email,password);
      return user;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}