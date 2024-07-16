import { User } from "../domain/userModel";
import { UserRepository } from "../domain/userRepository";

export class InMemoryUserRepository implements UserRepository {
  private users: User[] = [];

  async deleteUser(id: string): Promise<boolean> {
    const index = this.users.findIndex(user => user.id === id);
    
    if (index === -1) {
      return false;
    }
    this.users.splice(index, 1);
    return true;
  }

  async updateUser(id: string, name: string, email: string, password: string): Promise<boolean> {
    const user = this.users.find(user => user.id === id);
    if (!user) {
      return false;
    }
    user.name = name;
    user.email = email;
    user.password = password;
    return true;
  }

  async getAllUser(): Promise<User[]> {
    return this.users;
  }

  async createUser(name: string, email: string, password: string): Promise<User | null> {
    const id = (this.users.length + 1).toString(); // Generar un ID simple 
    const newUser = new User(id, name, email, password);
    console.log("new user", newUser);
    console.log("en memoria ")
    this.users.push(newUser);
    return newUser;
  }

  async loginUser(email: string, password: string): Promise<User | null> {
    const user = this.users.find(user => user.email === email);
    if (!user) {
      console.log("No existe ese usuario");
      return null;
    }
    if (user.password !== password) {
      console.log("Contraseña incorrecta");
      return null;
    }
    return user;
  }
}
