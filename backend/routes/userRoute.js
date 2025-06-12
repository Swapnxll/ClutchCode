import express from "express";
import {
  googlelogin,
  loginUser,
  myProfile,
  register,
  sheet,
  toggleQ,
  verifyUser,
} from "../controllers/userController.js";
import { isAuth } from "../middlewares/isAuth.js";

const router = express.Router();

router.post("/user/register", register);
router.post("/user/verify", verifyUser);

router.post("/user/login", loginUser);
router.post("/user/profile", isAuth, myProfile);
router.get("/user/question", isAuth, sheet);
router.put("/user/question/:id", isAuth, toggleQ);
router.get("/google", googlelogin);
export default router;
