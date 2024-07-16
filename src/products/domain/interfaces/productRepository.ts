import { Product } from "../models/productModel";

export interface ProductRepository {
  createProduct(
    name: string,
    description: string,
    price: number,
    stock_quantity: number,
    image: string
  ): Promise<Product | null>;
  deleteProduct(id: string):Promise<Product | null>;
  getProduct(id: string):Promise<Product | null>;
  updateProduct(
    id: string,
    name: string,
    description: string,
    price: number,
    stock_quantity: number,
    image: string
  ): Promise<Product | null>;
}