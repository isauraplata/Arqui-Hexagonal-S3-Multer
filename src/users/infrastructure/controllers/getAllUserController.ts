import { Request, Response } from "express";
import { GetAllUser } from "../../application/getUserUseCase";

export class GetAllUserController {
  constructor(readonly getAllUserUseCase: GetAllUser) {}

  async run(req: Request, res: Response) {

    try {
      const users = await this.getAllUserUseCase.run();
      if (users)
        res.status(201).send({
          status: "success",
          users: users
        });
      else
        res.status(204).send({
          status: "error",
          data: "Error getting users"
        });
    } catch (error) {
      res.status(204).send({
        status: "error",
        data: "Ocurrio un error",
        msn: error,
      });
    }
  }
}
