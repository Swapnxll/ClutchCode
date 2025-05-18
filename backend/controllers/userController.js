import sendMail from "../middlewares/SendMail.js";
import TryCatch from "../middlewares/trycatch.js";
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

export const verifyUser = TryCatch(async (req, res) => {
  const { otp, activationToken } = req.body;

  const verify = jwt.verify(activationToken, process.env.ACTIVATION_SECRET);

  if (!verify)
    return res.status(400).json({
      message: "Otp Expired",
    });

  if (verify.otp !== otp)
    return res.status(400).json({
      message: "Wrong Otp",
    });

  await User.create({
    name: verify.user.name,
    email: verify.user.email,
    password: verify.user.password,
  });

  res.json({
    message: "User Registered",
  });
});

export const loginUser = TryCatch(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user)
    return res.status(400).json({
      message: "No User with this email",
    });

  const mathPassword = await bcrypt.compare(password, user.password);

  if (!mathPassword)
    return res.status(400).json({
      message: "wrong Password",
    });

  const token = jwt.sign({ _id: user._id }, process.env.Jwt_Sec, {
    expiresIn: "15d",
  });
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax", // or "none" + secure:true if cross-site cookie needed
    maxAge: 15 * 24 * 60 * 60 * 1000,
  });

  res.json({
    message: `Welcome back ${user.name}`,

    user,
  });
});

export const myProfile = TryCatch(async (req, res) => {
  const user = await User.findById(req.user._id);

  res.json({ user });
});
