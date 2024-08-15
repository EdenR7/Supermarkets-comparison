export interface ActiveCartProductI {
  isActive: boolean;
  productId: string;
  productName: string;
  quantity: number;
}

export interface LiveCartI {
  _id: string;
  roomId: string;
  admin: string;
  collaborators: string[];
  todoCart: ActiveCartProductI[];
}
