import express from "express";
import https from "https";
import { URL } from "url";
import {
  getAllCourses,
  getSingleCourse,
  fetchLectures,
  fetchLecture,
  getMyCourses,
  checkout,
  paymentVerification,
  stream,
} from "../controllers/courseController.js";
import { isAuth } from "../middlewares/isAuth.js";

const router = express.Router();

router.get("/course/all", getAllCourses);
router.get("/course/:id", getSingleCourse);
router.get("/lectures/:id", isAuth, fetchLectures);
router.get("/lecture/:id", isAuth, fetchLecture);
router.get("/mycourse", isAuth, getMyCourses);
router.post("/course/checkout/:id", isAuth, checkout);
router.post("/verification/:id", isAuth, paymentVerification);
router.get("/stream/:id", stream);

const CLOUDINARY_URL =
  "https://res.cloudinary.com/do48h78id/video/upload/v1747860052/gofkel6x9dugpzt6snvc.mp4";

router.get("/demo-stream", (req, res) => {
  const range = req.headers.range;
  if (!range) return res.status(400).send("You are not authorized");

  const cloudUrl = new URL(CLOUDINARY_URL);

  const options = {
    hostname: cloudUrl.hostname,
    path: cloudUrl.pathname + cloudUrl.search,
    headers: { Range: range },
  };

  https
    .get(options, (cloudRes) => {
      res.writeHead(cloudRes.statusCode, cloudRes.headers);
      cloudRes.pipe(res);
    })
    .on("error", (err) => {
      console.error("Streaming error:", err.message);
      res.status(500).send("Error streaming video");
    });
});

export default router;
