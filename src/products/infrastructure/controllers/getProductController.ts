import { Request, Response } from "express";
import { GetProduct } from "../../application/getProductUseCase";

export class GetProductController {
  constructor(readonly getProductUseCase: GetProduct) {}

  async run(req: Request, res: Response) {
    const id = req.params.id;
    console.log(id);

    try {
      const product = await this.getProductUseCase.run(id);

      if (product)
        res.status(201).send({
          status: "success",
          product: product,
        });
      else
        res.status(204).send({
          status: "error",
          data: "NO fue posible obtener el registro",
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
