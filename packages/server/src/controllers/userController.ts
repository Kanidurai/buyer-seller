import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import UserModel from "../models/user";

// Register User
export const registerUser = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      res.status(400).json({
        success: false,
        message: "Email already exists",
      });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new UserModel({
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({
      success: true,
      message: "User successfully registered",
    });
  } catch (error) {
    //@ts-ignore
    console.error("Error registering user:", error.message);
    res.status(500).json({
      success: false,
      message: "An error occurred during registration",
    });
  }
};

// Login User
export const loginUser = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Login successful",
    });
  } catch (error) {
    //@ts-ignore
    console.error("Error logging in user:", error.message);
    res.status(500).json({
      success: false,
      message: "An error occurred during login",
    });
  }
};

// Get User by ID
export const getUserById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const user = await UserModel.findById(id);
    if (!user) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
      return;
    }

    res.status(200).json(user);
  } catch (error) {
    //@ts-ignore
    console.error("Error fetching user:", error.message);
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching the user",
    });
  }
};
