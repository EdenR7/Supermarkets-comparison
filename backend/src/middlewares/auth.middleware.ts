import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import Cart from "../models/cart.model";
import { getErrorData } from "../utils/errors/ErrorsFunctions";
import { AuthRequest, CartAuthRequest } from "../types/auth.types";
import { CartI } from "../types/cart.types";

const JWT_SECRET = process.env.JWT_SECRET as string;

export function verifyToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.header("Authorization") || req.header("authorization");
  const token = authHeader?.replace("Bearer ", "");
  if (!token) {
    console.log(`auth.middleware: no token provided`);
    return res.status(401).json("Access denied");
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    (req as AuthRequest).userId = decoded.userId;
    next();
  } catch (error) {
    console.log(
      "auth.middleware, verifyToken. Error while verifying token",
      error
    );
    res.status(401).json({ error: "Invalid token" });
  }
}

export async function authorizeCartOwner(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  const { cartId } = req.params;

  try {
    const cart = await Cart.findById(cartId);
    if (!cart) {
      console.log(cartId);

      return res
        .status(404)
        .json({ message: `Cart with id ${cartId} not found` });
    }

    if (cart.userId.toString() !== req.userId) {
      return res
        .status(403)
        .json({ message: "You do not have permission to access this cart" });
    }
    (req as CartAuthRequest).validcart = cart;
    next();
  } catch (err) {
    const { errorMessage, errorName } = getErrorData(err);
    console.error(
      "authorizeCartOwner Middleware: error",
      errorName,
      errorMessage
    );
    if (errorName === "ValidationError") {
      return res.status(400).json({ message: errorMessage });
    }
    if (errorName === "CastError") {
      return res.status(400).json({ message: "Invalid cart id" });
    }
    res.status(500).json({ message: "Internal Error" });
  }
}
