import React from "react";
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const CourseContext = createContext();

export const CourseContextProvider = ({ children }) => {
  const [courses, setCourses] = useState([]);
  const [course, setCourse] = useState([]);
  const [mycourse, setMyCourse] = useState([]);

  async function fetchCourses() {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_SERVER}/api/course/all`
      );

      setCourses(data.courses);
    } catch (err) {
      console.log(err);
    }
  }

  async function fetchCourse(id) {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_SERVER}/api/course/${id}`
      );
      setCourse(data.course);
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchMyCourse() {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_SERVER}/api/mycourse`,
        {
          withCredentials: true,
        }
      );

      setMyCourse(data.courses);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchCourses();
    fetchMyCourse();
  }, []);

  return (
    <CourseContext.Provider
      value={{
        courses,
        fetchCourses,
        fetchCourse,
        course,
        mycourse,
        fetchMyCourse,
      }}
    >
      {children}
    </CourseContext.Provider>
  );
};

export const CourseData = () => useContext(CourseContext);
