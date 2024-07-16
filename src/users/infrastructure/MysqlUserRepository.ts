import { query } from "../../database/mysql";
import { User } from "../domain/userModel";
import { UserRepository } from "../domain/userRepository";

export class MysqlUserRepository implements UserRepository {
  async deleteUser(id: string): Promise<boolean> {
    const idInt: number = parseInt(id);
    console.log("impriminedo el id: " + idInt);
    const sql = "DELETE FROM users WHERE id = ?";
    const params: any[] = [id];
    try {
      const [result]: any = await query(sql, params);
      console.log("impriminedo elresult " + result);
      return result;
    } catch (error) {
      throw new Error(`Error deleting user: ${error}`);
    }
  }

  async updateUser(
    id: string,
    name: string,
    email: string,
    password: string
  ): Promise<any> {
    const sql =
      "UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?";
    const params: any[] = [name, email, password, id];
    try {
      const [result]: any = await query(sql, params);
      return result.affectedRows > 0;
    } catch (error) {
      throw new Error(`Error updating user: ${error}`);
    }
  }

  async getAllUser(): Promise<any> {
    const sql = "SELECT * FROM users";
    try {
      const [results]: any = await query(sql, []);
      // return results.map((row: any) => new User(row.id, row.name, row.email, row.password));
      console.log("RESULTS: " + results);
      console.log(results);
      return results;
    } catch (error) {
      throw new Error(`Error retrieving all users: ${error}`);
    }
  }

  async createUser(
    name: string,
    email: string,
    password: string
  ): Promise<User | null> {
    const sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
    const params: any[] = [name, email, password];
    try {
      const [result]: any = await query(sql, params);
      return new User(result.insertId, name, email, password);
    } catch (error) {
      return null;
    }
  }

  async loginUser(email: string, password: string): Promise<string | null> {
    const sql = "SELECT * FROM users WHERE email= ?";
    const params: any[] = [email];
    try {
      const [result]: any = await query(sql, params);
      if (result.length === 0) {
        console.log("no existe ese user");
      }
      console.log(result[0]);
      return result[0];
    } catch (error) {
      return null;
    }
  }
}
