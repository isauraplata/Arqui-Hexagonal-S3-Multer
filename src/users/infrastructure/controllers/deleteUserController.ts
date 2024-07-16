import { Request, Response } from "express";
import { DeleteUser } from "../../application/deleteUserUseCase";

export class DeleteUserController {
  constructor(readonly deleteUserUseCase: DeleteUser) {}

  async run(req: Request, res: Response) {
    const id = req.params.id; 
    console.log(id);

    try {
      const userDeleted = await this.deleteUserUseCase.run(id);

      if (userDeleted)
        res.status(201).send({
          status: "success",
        });
      else
        res.status(204).send({
          status: "error",
          data: "NO fue posible eliminar el registro",
        });
    } catch (error) {
      res.status(204).send({
        status: "error",
        data: "Ocurrió un error",
        msn: error,
      });
    }
  }
}
