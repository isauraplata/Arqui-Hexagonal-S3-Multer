import { Product } from "../../domain/models/productModel";
import { ProductRepository } from "../../domain/interfaces/productRepository";
import { ProductModel, IProduct } from "../productSchema";

export class MongoProductRepository implements ProductRepository {
  private productToEntity(product: IProduct): Product {
    return new Product(
      product._id.toString(),
      product.name,
      product.description,
      product.price,
      product.stock_quantity,
      product.image
    );
  }

  async createProduct(
    name: string,
    description: string,
    price: number,
    stock_quantity: number,
    image: string
  ): Promise<Product | null> {
    try {
      const product = await ProductModel.create({
        name,
        description,
        price,
        stock_quantity,
        image,
      });
      return this.productToEntity(product);
    } catch (error) {
      console.log(error);
      console.error("Error creating product:", error);
      return null;
    }
  }

  async deleteProduct(id: string): Promise<Product | null> {
    try {
      const product = await ProductModel.findByIdAndDelete(id);
      return product ? this.productToEntity(product) : null;
    } catch (error) {
      console.error("Error deleting product:", error);
      return null;
    }
  }

  async getProduct(id: string): Promise<Product | null> {
    try {
      const product = await ProductModel.findById(id);
      return product ? this.productToEntity(product) : null;
    } catch (error) {
      console.error("Error getting product:", error);
      return null;
    }
  }

  async updateProduct(
    id: string,
    name: string,
    description: string,
    price: number,
    stock_quantity: number,
    image: string
  ): Promise<Product | null> {
    try {
      const product = await ProductModel.findByIdAndUpdate(
        id,
        { name, description, price, stock_quantity, image },
        { new: true }
      );
      return product ? this.productToEntity(product) : null;
    } catch (error) {
      console.error("Error updating product:", error);
      return null;
    }
  }
}
