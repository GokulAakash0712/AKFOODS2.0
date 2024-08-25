import dotenv from "dotenv";
dotenv.config();

import path from "path";
import express from "express";
import cors from "cors";
import { dbConnect } from "./configs/database.config";
import userRoute from "./routers/user.router";
import foodRoute from "./routers/food.router";
import orderRoute from "./routers/order.router";

dbConnect();

const app = express();
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:4200"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use('/uploads', express.static(path.join('uploads')));

app.use("/api/users", userRoute);
app.use("/api/foods", foodRoute);
app.use("/api/orders", orderRoute);

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
