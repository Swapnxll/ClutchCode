import sendMail from "../middlewares/SendMail.js";
import { User } from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"; // ✅ You forgot to import jwt

export const register = async (req, res) => {
  try {
    const { email, name, password } = req.body;

    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const otp = Math.floor(100000 + Math.random() * 900000); // ensures 6-digit OTP

    const activationToken = jwt.sign(
      {
        user: {
          name,
          email,
          password: hashPassword,
        },
        otp,
      },
      process.env.ACTIVATION_SECRET, // ✅ ensure this matches your .env key
      {
        expiresIn: "5m",
      }
    );

    const data = {
      name,
      otp,
    };

    await sendMail(email, "ClutchCode - Verify Your Email", data);

    res.status(200).json({
      message: "OTP sent to your email",
      activationToken,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Server error. Please try again later.",
    });
  }
};
