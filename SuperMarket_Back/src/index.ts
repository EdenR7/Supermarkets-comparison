import express, { Application, Request, Response } from "express";
// import path from "path";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db";
import userRoutes from "./routes/user.route";
import authRoutes from "./routes/auth.route";
import cartRoutes from "./routes/cart.route";
import productRoutes from "./routes/product.route";
import { verifyToken } from "./middlewares/auth.middleware";
import { app, server } from "./config/sockets";
import roomsRoutes from "./routes/rooms.routes";

app.use(express.static("public"));

const path = require("path");

dotenv.config();

const PORT = process.env.PORT || 3000;

async function main() {
  // Connect to database
  await connectDB();

  // MIDDLEWARES
  app.use(express.json());
  app.use(express.static("public"));

  app.use(cors());

  // ROUTES
  app.use("/api/auth", authRoutes); 
  app.use("/api/products", productRoutes); 
  app.use("/api/user", verifyToken, userRoutes); 
  app.use("/api/cart", verifyToken, cartRoutes); 
  app.use("/api/rooms", verifyToken, roomsRoutes); // to check

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
  });
}

main();
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

// check the seed !