import { Request, Response } from "express";
import { UpdateProduct } from "../../application/updateProductUseCase";
import { LocalFileStorage } from "../repositories/localFileStorageRepository";
import { S3FileStorage } from "../repositories/s3FileStorageRepository";

export class UpdateProductController {
  constructor(
    private readonly updateProductUseCase: UpdateProduct,
    private readonly fileStorage: LocalFileStorage | S3FileStorage
  ) {}

  async run(req: Request, res: Response) {
    const data = req.body;
    const id = req.params.id;
    const file = req.file;

    try {
      let imageUrl: string | undefined;
      let oldImageUrl: string | undefined;

      // Obtener la URL de la imagen actual si existe
      const productToUpdate = await this.updateProductUseCase.getProduct(id);
      if (productToUpdate) {
        oldImageUrl = productToUpdate.image;
      }

      if (file) {
        if (process.env.USE_S3 === "true") {
          imageUrl = await (this.fileStorage as S3FileStorage).saveFile(file);
        } else {
          imageUrl = await (this.fileStorage as LocalFileStorage).saveFile(
            file
          );
        }
      }

      // Asegurarse de que imageUrl sea un string y no undefined
      const finalImageUrl = imageUrl || ""; // Si imageUrl es undefined, asigna un string vacío

      const productUpdate = await this.updateProductUseCase.run(
        id,
        data.name,
        data.description,
        data.price,
        data.stock_quantity,
        finalImageUrl
      );

      if (productUpdate) {
        if (oldImageUrl && oldImageUrl !== finalImageUrl) {
          if (process.env.USE_S3 === "true") {
            await (this.fileStorage as S3FileStorage).deleteFile(oldImageUrl);
          }
        }
        res.status(200).send({
          status: "success",
          data: {
            id: productUpdate.id,
            name: productUpdate.name,
            description: productUpdate.description,
            price: productUpdate.price,
            stock_quantity: productUpdate.stock_quantity,
            image: productUpdate.image,
          },
        });
      } else {
        res.status(404).send({
          status: "error",
          data: "No fue posible actualizar el producto",
        });
      }
    } catch (error) {
      res.status(500).send({
        status: "error",
        data: "Ocurrió un error",
        message: error,
      });
    }
  }
}
