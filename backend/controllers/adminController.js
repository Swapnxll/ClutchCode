import TryCatch from "../middlewares/trycatch.js";
import { Courses } from "../models/courseModel.js";

export const createCourse = TryCatch(async (req, res) => {
  const { title, description, category, createdBy, duration, price, image } =
    req.body;

  await Courses.create({
    title,
    description,
    category,
    createdBy,
    image, // optional, will be undefined if not provided
    duration,
    price,
  });

  res.status(201).json({
    message: "Course Created Successfully",
  });
});
