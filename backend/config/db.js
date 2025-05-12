import mongoose from "mongoose";
import colors from "colors";
export const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Database Connected".bgGreen);
  } catch (error) {
    console.log(error);
  }
};
