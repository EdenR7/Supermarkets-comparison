import { Router } from "express";
import {
  addProductToCurrentCart,
  decrementProductQuantity,
  clearCurrentCart,
  incrementProductQuantity,
  removeProductFromCart,
  getLoggedInUser,
} from "../controllers/user.controller";

const router = Router();
router.get("/", getLoggedInUser)

router.post("/current-cart", addProductToCurrentCart);

router.patch("/current-cart/increment/:productId", incrementProductQuantity);

router.patch("/current-cart/decrement/:productId", decrementProductQuantity);

router.delete("/current-cart/clear", clearCurrentCart);

router.delete("/current-cart/:productId", removeProductFromCart);

export default router;
