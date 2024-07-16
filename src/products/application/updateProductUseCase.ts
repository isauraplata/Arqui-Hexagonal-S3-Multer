import { Product } from "../domain/models/productModel";
import { ProductRepository } from "../domain/interfaces/productRepository";

export class UpdateProduct {
  constructor(private readonly productRepository: ProductRepository) {}

  async getProduct(id: string): Promise<Product | null> {
    return this.productRepository.getProduct(id);
  }

  async run(
    id: string,
    name: string,
    description: string,
    price: number,
    stock_quantity: number,
    imageUrl: string | undefined
  ): Promise<Product | null> {
    // Asegurarse de que imageUrl sea un string y no undefined
    const finalImageUrl = imageUrl || ''; // Si imageUrl es undefined, asigna un string vacío

    return this.productRepository.updateProduct(id, name, description, price, stock_quantity, finalImageUrl);
  }
}
