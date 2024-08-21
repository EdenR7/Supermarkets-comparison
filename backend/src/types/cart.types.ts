import { Types } from "mongoose";

export interface CartProductI {
  productId: string;
  productName: string;
  quantity: number;
  productPrices: Array<{
    brandName: string;
    price: number;
  }>;
}
export interface CartI extends Document {
  name: string;
  userId: Types.ObjectId;
  collaborators?: Types.ObjectId[];
  cartProducts: CartProductI[];
}
