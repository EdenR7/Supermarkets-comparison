import { Schema, model, Document, Types } from "mongoose";
import { CompanyProductI } from "../types/products.types";
import { CompanyProductSchema } from "./product.model";
import { CartI } from "../types/cart.types";

const cartProductSchema = new Schema({
  productId: {
    type: String,
    required: true,
  },
  productName: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    default: 1,
  },
  productPrices: [CompanyProductSchema],
});

const cartSchema = new Schema<CartI>({
  name: {
    type: String,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  collaborators: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: [],
    },
  ],
  cartProducts: {
    type: [cartProductSchema],
    required: true,
    default: [],
  },
});

const CartModel = model<CartI>("Cart", cartSchema);
export default CartModel;
