import { UserRepository } from "../domain/userRepository";

export class Login{
  constructor(readonly userRepository: UserRepository) {}

  async run(
    email: string,
    password: string
  ): Promise<string | null> {
    try {
      const token= await this.userRepository.loginUser(email, password);
      return token;
    } catch (error) {
      return null;
    }
  }
}