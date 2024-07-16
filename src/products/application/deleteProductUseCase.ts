import { Product } from "../domain/models/productModel";
import { ProductRepository } from "../domain/interfaces/productRepository";

export class DeleteProduct{
  constructor(readonly productRepository: ProductRepository) {}

  async run(
    id: string,
  ): Promise<Product | null> {
    try {
      const product= await this.productRepository.deleteProduct(id);
      return product;
    } catch (error) {
      return null;
    }
  }
}