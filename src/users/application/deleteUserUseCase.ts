import { User } from "../domain/userModel";
import { UserRepository } from "../domain/userRepository";

export class DeleteUser {
  constructor(readonly userRepository: UserRepository) {}

  async run(id: string): Promise<User | null> { 
    try {
      const user = await this.userRepository.deleteUser(id);
      return user;
    } catch (error) {
      return null;
    }
  }
}
