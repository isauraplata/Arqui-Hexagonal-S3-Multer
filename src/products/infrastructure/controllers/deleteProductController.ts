import { Request, Response } from "express";
import { DeleteProduct } from "../../application/deleteProductUseCase";

export class DeleteProductController {
  constructor(readonly deleteProductUseCase: DeleteProduct) {}

  async run(req: Request, res: Response) {
    const id = req.params.id; 
    console.log(id);

    try {
      const productDeleted = await this.deleteProductUseCase.run(id);

      if (productDeleted)
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
