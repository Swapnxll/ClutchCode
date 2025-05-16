import express from "express";
import { isAdmin, isAuth } from "../middlewares/isAuth.js";
import {
  //   addLectures,
  createCourse,
  //   deleteCourse,
  //   deleteLecture,
  //   getAllStats,
  //   getAllUser,
  //   updateRole,
} from "../controllers/adminController.js";
import { uploadFiles } from "../middlewares/multer.js";

const router = express.Router();

router.post("/course/new", isAuth, isAdmin, createCourse);

export default router;
