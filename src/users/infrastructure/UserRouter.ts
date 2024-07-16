import express from "express";
import { createUserController } from "./dependencies";
import { loginUserController } from "./dependencies";
import { deleteUserController } from "./dependencies";
import { updateUserController } from "./dependencies";
import { getAllUserController } from "./dependencies";

export const userRouter = express.Router();

userRouter.post("/registro",createUserController.run.bind(createUserController))

userRouter.post("/login",loginUserController.run.bind(loginUserController))

userRouter.delete("/:id",deleteUserController.run.bind(deleteUserController))

userRouter.put("/:id",updateUserController.run.bind(updateUserController))

userRouter.get("/getAll",getAllUserController.run.bind(getAllUserController))
