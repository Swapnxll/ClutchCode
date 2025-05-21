import dotenv from "dotenv";
import express from "express";
import colors from "colors";
import { connectDb } from "./config/db.js";
import userRoute from "./routes/userRoute.js";
import courseRoute from "./routes/courseRoute.js";
import adminRoute from "./routes/adminRoute.js";
import morgan from "morgan";
import Razorpay from "razorpay";
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config();

export const instance = new Razorpay({
  key_id: process.env.Razorpay_Key,
  key_secret: process.env.Razorpay_Secret,
});

const PORT = process.env.PORT || 8081;
const app = express();
app.use(morgan("dev"));

app.use(
  cors({
    origin: `${process.env.CLIENT}`, // your frontend origin
    credentials: true, // allow cookies to be sent
  })
);

dotenv.config();
app.use(cookieParser());
//middleware
app.use(express.json());
app.use("/uploads", express.static("uploads"));

//routes
app.get("/", (req, res) => {
  res.send("server is working");
});

app.use("/api", userRoute);
app.use("/api", courseRoute);
app.use("/api", adminRoute);
app.post("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax", // Or 'none' if using cross-site requests with secure: true
  });

  res.status(200).json({ message: "Logged out successfully" });
});

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`.bgYellow);
  connectDb();
});
