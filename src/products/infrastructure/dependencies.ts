import { S3FileStorage } from "./repositories/s3FileStorageRepository";
import { LocalFileStorage } from "./repositories/localFileStorageRepository";
import { CreateProduct } from "../application/createProductUseCase";
import { CreateProductController } from "./controllers/createProductController";
import { DeleteProduct } from "../application/deleteProductUseCase";
import { DeleteProductController } from "./controllers/deleteProductController";
import { GetProduct } from "../application/getProductUseCase";
import { GetProductController } from "./controllers/getProductController";
import { UpdateProduct } from "../application/updateProductUseCase";
import {UpdateProductController } from "./controllers/updateProductController";
import { MysqlProductRepository } from "./repositories/MysqlProductRepository";
import { MongoProductRepository } from "./repositories/MongoProductRepository";
import dotenv from "dotenv";


dotenv.config();

// Inicializa las dependencias
const useS3 = process.env.USE_S3 === 'true';  //se checa si se usara s3 o no


const fileStorage = useS3 ? new S3FileStorage() : new LocalFileStorage();

const dbType = process.env.DB_TYPE;
const productRepository = dbType === 'mongo' ? new MongoProductRepository() : new MysqlProductRepository();


export const createProductUseCase = new CreateProduct(productRepository);
export const createProductController = new CreateProductController(createProductUseCase, fileStorage);


export const deleteProductUseCase = new DeleteProduct(productRepository);
export const deleteProductController = new DeleteProductController(deleteProductUseCase);


export const getProductUseCase = new GetProduct(productRepository);
export const getProductController = new GetProductController(getProductUseCase);


export const updateProductUseCase = new UpdateProduct(productRepository);
export const updateProductController = new UpdateProductController(updateProductUseCase,fileStorage);
