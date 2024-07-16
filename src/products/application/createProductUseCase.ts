import { Product } from "../domain/models/productModel";
import { ProductRepository } from "../domain/interfaces/productRepository";

export class CreateProduct{
  constructor(readonly productRepository: ProductRepository) {}

  async run(
    name: string,
    description: string,
    price: number,
    stock_quantity: number,
    image: string
  ): Promise<Product | null> {
    try {
      const product= await this.productRepository.createProduct(name, description, price, stock_quantity, image);
      return product;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}