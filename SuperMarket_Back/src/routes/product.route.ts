import { Router } from "express";
import {
  getProductById,
  getProductByName,
  getProducts,
} from "../controllers/product.controller";

const productsRouter = Router();

productsRouter.get("/", getProducts);
productsRouter.get("/:id", getProductById);

//To delete!!!
productsRouter.post("/", getProductByName); // dont need

export default productsRouter;
