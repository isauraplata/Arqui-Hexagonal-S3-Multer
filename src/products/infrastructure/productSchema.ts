import mongoose, { Schema, Document } from 'mongoose';

export interface IProduct extends Document {
    _id: any;
    name: string;
    description: string;
    price: number;
    stock_quantity: number;
    image: string;
}

const ProductSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  stock_quantity: { type: Number, required: true },
  image: { type: String, required: true }
});

export const ProductModel = mongoose.model<IProduct>('Product', ProductSchema);