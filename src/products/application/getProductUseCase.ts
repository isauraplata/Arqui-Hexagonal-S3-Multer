import { Product } from "../domain/models/productModel";
import { ProductRepository } from "../domain/interfaces/productRepository";

export class GetProduct{
  constructor(readonly productRepository: ProductRepository) {}

  async run(
    id: string
  ): Promise<Product | null> {
    try {
      const product= await this.productRepository.getProduct(id);
      return product;
    } catch (error) {
      return null;
    }
  }
}