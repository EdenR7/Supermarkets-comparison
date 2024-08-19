import { Router } from "express";
import {
  createCart,
  getUserCarts,
  getCartById,
  updateCart,
  deleteCart,
  addCollaborator,
} from "../controllers/cart.controller";
import { authorizeCartOwner } from "../middlewares/auth.middleware";

const router = Router();

router.post("/", createCart);

router.get("/", getUserCarts);

router.get("/:cartId", getCartById);

router.patch("/:cartId", authorizeCartOwner, updateCart); //

router.delete("/:cartId", authorizeCartOwner, deleteCart); //

router.post("/:cartId/collaborators", authorizeCartOwner, addCollaborator);
// delete collaborator

export default router;
