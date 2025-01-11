import express from "express";
import bodyParser from "body-parser";
import userRoutes from "./routes/userRoutes";
import sellerRoutes from "./routes/sellerRoutes"

const app = express();

// Middleware
app.use(bodyParser.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/seller", sellerRoutes);

export default app;
