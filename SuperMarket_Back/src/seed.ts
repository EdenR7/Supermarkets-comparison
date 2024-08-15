import { config } from "dotenv";
import connectDB from "./config/db";
import { connection } from "mongoose";

import bcrypt from "bcrypt";
import UserModel from "./models/user.model";
import CartModel from "./models/cart.model";

const SALT_ROUNDS = 10;

config();

const users = [
  {
    username: "john_doe",
    email: "john.doe@example.com",
    password: "123",
    firstName: "John",
    lastName: "Doe",
    address: {
      city: "New York",
      street: "123 Main St",
    },
    currentCart: [],
  },
  {
    username: "jane_smith",
    email: "jane.smith@example.com",
    password: "123",
    firstName: "Jane",
    lastName: "Smith",
    address: {
      city: "Los Angeles",
      street: "456 Maple Ave",
    },
    currentCart: [],
  },
  {
    username: "eden",
    email: "eden@eden.com",
    password: "12345678Ed!",
    firstName: "Eden",
    lastName: "Roth",
    address: {
      city: "Tel Aviv",
      street: "789 Roth St",
    },
    currentCart: [],
  },
];

async function seedDB() {
  try {
    await connectDB();
    await UserModel.deleteMany({});
    await CartModel.deleteMany({});

    const createdUsers = await Promise.all(
      users.map(async (u) => {
        const hashedPassword = await bcrypt.hash(u.password, SALT_ROUNDS);
        const user = new UserModel({ ...u, password: hashedPassword });
        await user.save();
        return user;
      })
    );

    console.log("Database seeded");
  } catch (err) {
    console.error(err);
  } finally {
    connection.close();
  }
}

seedDB();
