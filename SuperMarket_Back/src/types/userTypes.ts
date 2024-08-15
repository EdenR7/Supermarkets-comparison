import { Document, Types } from "mongoose";
import { CompanyProductI } from "./products.types";

export interface CartProductI {
  productId: string;
  productName: string;
  productPrices: CompanyProductI[];
  quantity: number;
}

export interface UserAddress {
  city: string;
  street: string;
}

export interface UserI extends Document {
  _id: Types.ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  address: UserAddress;
  password: string;
  currentCart: CartProductI[];

  comparePassword(candidatePassword: string): Promise<boolean>;
}
