
import mongoose from "mongoose";
import cors from "cors";
import express from "express";
import bodyParser from "body-parser";

require("dotenv").config();

const PORT = process.env.BE_PORT;

const corsOptions = {
  origin: "*",  
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

const app = express();

app.use(cors(corsOptions));

app.use(express.json()); 

import userRoutes from "./routes/userRoutes";
import sellerRoutes from "./routes/sellerRoutes";

app.use("/api/users", userRoutes);
app.use("/api/sellers", sellerRoutes);

mongoose
  .connect(process.env.MONGODB_URI || "", {
    dbName: process.env.DB_NAME,
    user: process.env.DB_USER,
    pass: process.env.DB_PASS,
  })
  .then(() => {
    console.info("Connected to MongoDB");
    app.listen(PORT, () => {
      console.info(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1);
  });

export default app;