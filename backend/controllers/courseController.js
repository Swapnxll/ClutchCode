import { instance } from "../index.js"; // razoepay instace
import TryCatch from "../middlewares/trycatch.js";
import { Courses } from "../models/courseModel.js";
import { Lecture } from "../models/lectureModel.js";
import { User } from "../models/userModel.js";
import crypto from "crypto";
import { Payment } from "../models/paymentModel.js";
import express from "express";
import https from "https";
import { URL } from "url";
// import { Progress } from "../models/Progress.js";
import dotenv from "dotenv";

export const getAllCourses = TryCatch(async (req, res) => {
  const courses = await Courses.find();
  res.json({
    courses,
  });
});

export const getSingleCourse = TryCatch(async (req, res) => {
  const course = await Courses.findById(req.params.id);

  res.json({
    course,
  });
});

export const fetchLectures = TryCatch(async (req, res) => {
  const lectures = await Lecture.find({ course: req.params.id }); //using course id to fetch all lectures

  const user = await User.findById(req.user._id);

  if (user.role === "admin") {
    return res.json({ lectures });
  }

  if (!user.subscription.includes(req.params.id))
    return res.status(400).json({
      message: "You have not subscribed to this course",
    });

  res.json({ lectures });
});

export const fetchLecture = TryCatch(async (req, res) => {
  const lecture = await Lecture.findById(req.params.id);

  const user = await User.findById(req.user._id);

  if (user.role === "admin") {
    return res.json({ lecture });
  }

  if (!user.subscription.includes(lecture.course))
    return res.status(400).json({
      message: "You have not subscribed to this course",
    });

  res.json({ lecture });
});

export const getMyCourses = TryCatch(async (req, res) => {
  const courses = await Courses.find({ _id: req.user.subscription });

  res.json({
    courses,
  });
});

export const checkout = TryCatch(async (req, res) => {
  const user = await User.findById(req.user._id);

  const course = await Courses.findById(req.params.id);

  if (user.subscription.includes(course._id)) {
    return res.status(400).json({
      message: "You already have this course",
    });
  }

  const options = {
    amount: Number(course.price * 100),
    currency: "INR",
  };

  const order = await instance.orders.create(options);

  res.status(201).json({
    order,
    course,
  });
});

export const paymentVerification = TryCatch(async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.Razorpay_Secret)
    .update(body)
    .digest("hex");

  const isAuthentic = expectedSignature === razorpay_signature;

  if (isAuthentic) {
    await Payment.create({
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    });

    const user = await User.findById(req.user._id);

    const course = await Courses.findById(req.params.id);

    user.subscription.push(course._id); //adding courese to subscription array

    // await Progress.create({
    //   course: course._id,
    //   completedLectures: [],
    //   user: req.user._id,
    // });

    await user.save();

    res.status(200).json({
      message: "Course Purchased Successfully",
    });
  } else {
    return res.status(400).json({
      message: "Payment Failed",
    });
  }
});

export const stream = TryCatch(async (req, res) => {
  const lecture = await Lecture.findById(req.params.id);

  if (!lecture || !lecture.video) {
    return res
      .status(404)
      .json({ message: "Lecture not found or missing video URL" });
  }
  var CLOUDINARY_URL = lecture.video;

  const range = req.headers.range;
  if (!range) {
    return res.status(400).send("You're not authorized");
  }

  const cloudUrl = new URL(CLOUDINARY_URL);
  const options = {
    hostname: cloudUrl.hostname,
    path: cloudUrl.pathname + cloudUrl.search,
    headers: { Range: range },
  };

  https
    .get(options, (cloudRes) => {
      if (cloudRes.statusCode === 404) {
        return res.status(404).send("video not found");
      }

      res.writeHead(cloudRes.statusCode, cloudRes.headers);
      cloudRes.pipe(res);
    })
    .on("error", (err) => {
      return res.status(500).send("Error streaming video");
    });
});

// export const addProgress = TryCatch(async (req, res) => {
//   const progress = await Progress.findOne({
//     user: req.user._id,
//     course: req.query.course,
//   });

//   const { lectureId } = req.query;

//   if (progress.completedLectures.includes(lectureId)) {
//     return res.json({
//       message: "Progress recorded",
//     });
//   }

//   progress.completedLectures.push(lectureId);

//   await progress.save();

//   res.status(201).json({
//     message: "new Progress added",
//   });
// });

// export const getYourProgress = TryCatch(async (req, res) => {
//   const progress = await Progress.find({
//     user: req.user._id,
//     course: req.query.course,
//   });

//   if (!progress) return res.status(404).json({ message: "null" });

//   const allLectures = (await Lecture.find({ course: req.query.course })).length;

//   const completedLectures = progress[0].completedLectures.length;

//   const courseProgressPercentage = (completedLectures * 100) / allLectures;

//   res.json({
//     courseProgressPercentage,
//     completedLectures,
//     allLectures,
//     progress,
//   });
// });
