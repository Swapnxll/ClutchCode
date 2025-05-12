import dotenv from "dotenv";
import express from "express";
import colors from "colors";
import { connectDb } from "./config/db.js";
dotenv.config();
const PORT = process.env.PORT || 8081;
const app = express();

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`.bgYellow);
  connectDb();
});
