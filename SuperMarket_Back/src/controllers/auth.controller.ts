import { Request, Response } from "express";
import UserModel from "../models/user.model";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { getErrorData } from "../utils/errors/ErrorsFunctions";
import { config } from "dotenv";

config();
const JWT_SECRET = process.env.JWT_SECRET as string;
const SALT_ROUNDS = 10;

export const register = async (req: Request, res: Response) => {
  const { firstName, lastName, email, username, address, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    const newUser = new UserModel({
      email,
      password: hashedPassword,
      username,
      firstName,
      lastName,
      address,
    });
    await newUser.save();
    const token = jwt.sign({ userId: newUser._id }, JWT_SECRET, {
      expiresIn: "4h",
    });

    res.status(201).json({ token, user: newUser });
  } catch (error) {
    const { errorMessage, errorName } = getErrorData(error);
    console.log("register", errorName, errorMessage);
    if ((error as any).code === 11000) {
      const duplicateField = Object.keys((error as any).keyPattern)[0];
      const message = `The ${duplicateField} is already taken.`;
      console.log(message);
      return res.status(400).json({ message });
    }
    res.status(500).json({ message: "Registration failed" });
  }
};

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const user = await UserModel.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: "Authentication failed" });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ message: "Authentication failed" });
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: "5h",
    });

    res.status(200).json({ token });
  } catch (error) {
    const { errorMessage, errorName } = getErrorData(error);
    console.log("login", errorName, errorMessage);
    res.status(500).json({ message: "Login failed" });
  }
};


