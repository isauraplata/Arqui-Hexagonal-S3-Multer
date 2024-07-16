import { CreateUser } from "../application/createUserUseCase";
import { CreateUserController } from "./controllers/createUserController";
import { DeleteUserController } from "./controllers/deleteUserController";
import { UpdateUserController } from "./controllers/updateUserController";
import { MysqlUserRepository } from "./MysqlUserRepository";
import { MongodbUserRepository } from "./MongoUserRepository";
import { Login } from "../application/loginUSeCase";
import { UpdateUser } from "../application/updateUserUseCase";
import { DeleteUser } from "../application/deleteUserUseCase";
import { GetAllUser } from "../application/getUserUseCase";
import { LoginController } from "./controllers/loginUserController";
import { GetAllUserController } from "./controllers/getAllUserController";
import dotenv from "dotenv";

dotenv.config();

const dbType = process.env.DB_TYPE;
//se verfica que bd se utilizara y de acuerdo a eso, se utiliza el repository

console.log("TYPE: " + dbType)

const userRepository = dbType === 'mongo' ? new MongodbUserRepository() : new MysqlUserRepository();
 
const mongoRepositoy = new MongodbUserRepository()

export const createUserUseCase = new CreateUser(mongoRepositoy);
export const createUserController = new CreateUserController(createUserUseCase);

export const loginUseCase = new Login(userRepository);
export const loginUserController = new LoginController(loginUseCase);

export const updateUseCase = new UpdateUser(userRepository);
export const updateUserController = new UpdateUserController(updateUseCase);

export const deleteteUseCase = new DeleteUser(userRepository);
export const deleteUserController = new DeleteUserController(deleteteUseCase);

export const getAllUserUseCase = new GetAllUser(userRepository);
export const getAllUserController = new GetAllUserController(getAllUserUseCase);