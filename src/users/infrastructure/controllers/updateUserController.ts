import { Request, Response } from "express";
import { UpdateUser } from "../../application/updateUserUseCase";

export class UpdateUserController {
  constructor(readonly updateUserUseCase: UpdateUser) {}

  async run(req: Request, res: Response) {
    const data = req.body;
    const id = req.params.id;

    try {
      const userUpdate = await this.updateUserUseCase.run(
        id,
        data.name,
        data.email,
        data.password
      );

      if (userUpdate)
        res.status(201).send({
          status: "success",
          data: {
            id: userUpdate?.id,
            name: userUpdate?.name,
            email: userUpdate?.email,
            password: userUpdate?.password,
          },
        });
      else
        res.status(204).send({
          status: "error",
          data: "NO fue posible",
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
