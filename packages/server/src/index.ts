import app from "./app";
import mongoose from "mongoose";

require("dotenv").config();

const PORT = process.env.BE_PORT;

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
