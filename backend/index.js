import dotenv from "dotenv";
import express from "express";
import colors from "colors";
import { connectDb } from "./config/db.js";
import userRoute from "./routes/userRoute.js";

dotenv.config();
const PORT = process.env.PORT || 8081;
const app = express();
dotenv.config();
//middleware
app.use(express.json());

//routes
app.get("/", (req, res) => {
  res.send("server is working");
});

app.use("/api", userRoute);

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`.bgYellow);
  connectDb();
});
