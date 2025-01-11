import { Request, Response } from "express";
import SellerModel from "../models/seller";

// Create User
export const createUser = async (req: Request, res: Response): Promise<void> => {
  const { name, rating, review } = req.body;
  try {
    const newSeller = new SellerModel({
      name,
      rating,
      review,
    });

    await newSeller.save();

    res.status(201).json({
      success: true,
      message: "New seller successfully created",
    });
  } catch (error) {
    //@ts-ignore
    console.error("Error creating a seller user:", error.message);
    res.status(500).json({
      success: false,
      message: "An error occurred during seller user creation",
    });
  }
};

// Get all sellers
export const getAllSeller = async (req: Request, res: Response): Promise<Response> => {
    try {
      const sellers = await SellerModel.find(); // Fetch all sellers
      if (!sellers || sellers.length === 0) {
        return res.status(404).json({
          success: false,
          message: "No sellers found",
        });
      }
  
      return res.status(200).json(sellers); // Explicit return of Response
    } catch (error) {
      //@ts-ignore
      console.error("Error fetching sellers:", error.message);
      return res.status(500).json({
        success: false,
        message: "An error occurred while fetching the sellers",
      });
    }
  };
