import type { Request } from "express";
import type { JwtPayload } from "jsonwebtoken";
import { CartI } from "./cart.types";

export interface AuthRequest extends Request {
  userId?: string;
}

export interface UserJwtPaylod extends JwtPayload {
  _id: string;
}

export interface CartAuthRequest extends AuthRequest {
  validcart?: CartI;
}
