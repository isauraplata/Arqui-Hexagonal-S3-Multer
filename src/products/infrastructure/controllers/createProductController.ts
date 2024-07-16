import { Request, Response } from 'express';
import { CreateProduct } from '../../application/createProductUseCase';
import { LocalFileStorage } from '../repositories/localFileStorageRepository';
import { S3FileStorage } from '../repositories/s3FileStorageRepository';

export class CreateProductController {
  constructor(
    private readonly createProductUseCase: CreateProduct,
    private readonly fileStorage: LocalFileStorage | S3FileStorage
  ) {}

  async run(req: Request, res: Response) {
    const data = req.body;
    try {
      const file = req.file;
      console.log('File received:', file);

      if (!file) {
        return res.status(400).send({ status: 'error', data: 'Archivo no proporcionado o vacío' });
      }

      let imageUrl: string;
      if (process.env.USE_S3 === 'true') {
        if (!file.buffer || file.buffer.length === 0) {
          return res.status(400).send({ status: 'error', data: 'Archivo no proporcionado o vacío' });
        }
        imageUrl = await (this.fileStorage as S3FileStorage).saveFile(file);
      } else {
        imageUrl = await (this.fileStorage as LocalFileStorage).saveFile(file);
      }

      console.log('Image url:', imageUrl);

      const product = await this.createProductUseCase.run(
        data.name,
        data.description,
        data.price,
        data.stock_quantity,
        imageUrl
      );

      if (product) {
        res.status(201).send({
          status: 'success',
          data: {
            id: product.id,
            name: product.name,
            description: product.description,
            price: product.price,
            stock_quantity: product.stock_quantity,
            image: product.image,
          }
        });
      } else {
        res.status(204).send({ status: 'error', data: 'No fue posible agregar el registro' });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({ status: 'error', data: 'Ocurrió un error', message: error });
    }
  }
}
