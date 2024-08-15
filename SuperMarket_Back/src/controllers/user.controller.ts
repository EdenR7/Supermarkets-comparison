import { Response } from "express";
import UserModel from "../models/user.model";
import { CartProductI } from "../types/userTypes";
import { AuthRequest } from "../types/auth.types";
import { getErrorData } from "../utils/errors/ErrorsFunctions";
import { BRANDS_NAMES } from "../constants/products.constants";
import ProductModel from "../models/product.model";

export const getLoggedInUser = async (req: AuthRequest, res: Response) => {
  try {
    const user = await UserModel.findById(req.userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      address: user.address,
      currentCart: user.currentCart,
    });
  } catch (err) {
    const { errorMessage, errorName } = getErrorData(err);
    console.log("getLoggedInUser error: ", errorName + "\n" + errorMessage);
    res.status(500).json({ message: "Internal Error" });
  }
};

export const addProductToCurrentCart = async (
  req: AuthRequest,
  res: Response
) => {
  const { productId, quantity } = req.body;
  if (!productId || !quantity || isNaN(Number(quantity)))
    return res
      .status(400)
      .json({ message: "Missing or Unvalid required fields" });

  try {
    const product = await ProductModel.findById({ _id: productId });
    if (!product) return res.status(404).json({ message: "Product not found" });

    const newProduct: CartProductI = {
      productId,
      productName: product.name,
      productPrices: product.prices,
      quantity,
    };
    const user = await UserModel.findOneAndUpdate(
      {
        _id: req.userId,
        "currentCart.productId": { $ne: newProduct.productId }, // $ne : not equal
      },
      {
        $push: { currentCart: newProduct },
      },
      { new: true }
    );
    if (!user)
      return res
        .status(404)
        .json({ message: "User not found or product already exist" });


    res.status(200).json(user.currentCart);
  } catch (error) {
    const { errorMessage, errorName } = getErrorData(error);
    console.log(errorName, errorMessage);
    if (errorName === "CastError")
      return res.status(404).json({ message: "Invalid product ID" });
    res.status(500).json({ message: errorMessage });
  }
};

//////////////////////////////////////////////////////////////////
export const incrementProductQuantity = async (
  req: AuthRequest,
  res: Response
) => {
  const { productId } = req.params;

  try {
    const user = await UserModel.findOneAndUpdate(
      { _id: req.userId, "currentCart.productId": productId },
      { $inc: { "currentCart.$.quantity": 1 } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user.currentCart);
  } catch (error) {
    const { errorMessage, errorName } = getErrorData(error);
    console.log(errorName, errorMessage);
    res.status(500).json({ message: errorMessage });
  }
};

export const decrementProductQuantity = async (
  req: AuthRequest,
  res: Response
) => {
  const { productId } = req.params;

  try {
    let user = await UserModel.findOneAndUpdate(
      { _id: req.userId, "currentCart.productId": productId },
      { $inc: { "currentCart.$.quantity": -1 } },
      { new: true }
    );

    if (!user) {
      return res
        .status(404)
        .json({ message: "User cart with that product ID not found" });
    }

    const product = user.currentCart.find((item) => {
      return item.productId === productId;
    });
    if (product && product.quantity < 1) {
      user = await UserModel.findOneAndUpdate(
        { _id: req.userId },
        { $pull: { currentCart: { productId } } },
        { new: true }
      );
      if (!user) {
        return res
          .status(404)
          .json({ message: "User not found after removing product" });
      }
    }

    res.status(200).json(user.currentCart);
  } catch (error) {
    const { errorMessage, errorName } = getErrorData(error);
    console.log(errorName, errorMessage);
    res.status(500).json({ message: errorMessage });
  }
};

export async function removeProductFromCart(req: AuthRequest, res: Response) {
  const { productId } = req.params;

  try {
    const user = await UserModel.findOneAndUpdate(
      { _id: req.userId },
      { $pull: { currentCart: { productId } } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user.currentCart);
  } catch (error) {
    const { errorMessage, errorName } = getErrorData(error);
    console.log(errorName, errorMessage);
    res.status(500).json({ message: errorMessage });
  }
}

export async function clearCurrentCart(req: AuthRequest, res: Response) {
  try {
    const user = await UserModel.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.currentCart = [];

    await user.save();

    res.status(200).json(user.currentCart);
  } catch (error) {
    const { errorMessage, errorName } = getErrorData(error);
    console.log(errorName, errorMessage);
    res.status(500).json({ message: errorMessage });
  }
}
