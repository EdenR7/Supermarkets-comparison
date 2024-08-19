import { Response } from "express";
import CartModel from "../models/cart.model";
import UserModel from "../models/user.model";
import { AuthRequest, CartAuthRequest } from "../types/auth.types";
import { getErrorData } from "../utils/errors/ErrorsFunctions";

export async function createCart(req: AuthRequest, res: Response) {
  const { name, cartProducts } = req.body;
  if (!name || !cartProducts) {
    return res.status(400).json({ message: "Missing required fields" });
  }
  try {
    const cart = await CartModel.findOne({ name, userId: req.userId });
    if (cart)
      return res.status(400).json({ message: "Cart Name already exists" });

    const newCart = new CartModel({
      name,
      userId: req.userId,
      cartProducts,
    });

    await newCart.save();

    return res.status(201).json(newCart);
  } catch (err) {
    const { errorMessage, errorName } = getErrorData(err);
    console.error("createCart: error", errorName, errorMessage);
    if (errorName === "ValidationError") {
      return res.status(400).json({ message: errorMessage });
    }
    res.status(500).json({ message: "Internal Error" });
  }
}

export async function getUserCarts(req: AuthRequest, res: Response) {
  try {
    const carts = await CartModel.find({ userId: req.userId });
    res.json(carts);
  } catch (err) {
    const { errorMessage, errorName } = getErrorData(err);
    console.error("getUserCarts: error", errorName, errorMessage);
    if (errorName === "ValidationError") {
      return res.status(400).json({ message: errorMessage });
    }
    res.status(500).json({ message: "Internal Error" });
  }
}

export async function getCartById(req: AuthRequest, res: Response) {
  const { cartId } = req.params;

  try {
    const cart = await CartModel.findById(cartId);
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    res.json(cart);
  } catch (err) {
    const { errorMessage, errorName } = getErrorData(err);
    console.error("getCartById: error", errorName, errorMessage);
    if (errorName === "ValidationError") {
      return res.status(400).json({ message: errorMessage });
    }
    res.status(500).json({ message: "Internal Error" });
  }
}

export async function addCollaborator(req: CartAuthRequest, res: Response) {
  const { cartId } = req.params;
  const { collaboratorUsername } = req.body;
  if (!collaboratorUsername) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const user = await UserModel.findOne({ username: collaboratorUsername });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // The existence of the cart and the user is already checked in the middlewares !
    const cart = await CartModel.findOneAndUpdate(
      {
        _id: cartId,
        collaborators: { $ne: user._id },
      },
      {
        $push: { collaborators: user._id },
      },
      { new: true }
    );

    if (!cart) {
      return res
        .status(400)
        .json({ message: `${collaboratorUsername} is already a collaborator` });
    }

    res.json(cart);
  } catch (err) {
    const { errorMessage, errorName } = getErrorData(err);
    console.error("addCollaborator: error", errorName, errorMessage);
    if (errorName === "ValidationError") {
      return res.status(400).json({ message: errorMessage });
    }
    res.status(500).json({ message: "Internal Error" });
  }
}

export async function updateCart(req: CartAuthRequest, res: Response) {
  const { cartId } = req.params;
  const { name, cartProducts, collaborators } = req.body;

  try {
    const updatedCart = await CartModel.findOneAndUpdate(
      { _id: cartId },
      {
        $set: {
          ...(name && { name }),
          ...(Array.isArray(cartProducts) &&
            cartProducts.length && { cartProducts }),
          ...(Array.isArray(collaborators) &&
            collaborators.length && { collaborators }),
        },
      },
      { new: true, runValidators: true }
    );

    if (!updatedCart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    res.json(updatedCart);
  } catch (err) {
    const { errorMessage, errorName } = getErrorData(err);
    console.error("updateCart: error", errorName, errorMessage);
    if (errorName === "ValidationError") {
      return res.status(400).json({ message: errorMessage });
    }
    res.status(500).json({ message: "Internal Error" });
  }
}

export async function deleteCart(req: CartAuthRequest, res: Response) {
  const { cartId } = req.params;

  try {
    const cart = await CartModel.findByIdAndDelete(cartId);
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    res.json({ message: "Cart deleted successfully" });
  } catch (err) {
    const { errorMessage, errorName } = getErrorData(err);
    console.error("deleteCart: error", errorName, errorMessage);
    if (errorName === "ValidationError") {
      return res.status(400).json({ message: errorMessage });
    }
    res.status(500).json({ message: "Internal Error" });
  }
}
