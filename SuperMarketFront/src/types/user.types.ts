import { IBrandProduct } from "./product.types";

export interface LoggedInUser {
  _id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  currentCart: {
    productId: string;
    productName: string;
    quantity: number;
    productPrices: IBrandProduct[];
  }[];
}
