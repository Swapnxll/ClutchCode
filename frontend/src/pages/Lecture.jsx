import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Loading from "../components/Loading";
import { FaVideo } from "react-icons/fa";
import { TiTick } from "react-icons/ti";

const Lecture = ({ user }) => {
  const [lectures, setLectures] = useState([]);
  const [lecture, setLecture] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lecLoading, setLecLoading] = useState(false);
  const params = useParams();
  const navigate = useNavigate();

  // const videoStreamUrl = `${import.meta.env.VITE_SERVER}/api/stream/${
  //   lecture._id
  // }`;

  useEffect(() => {
    fetchLectures();
  }, []);

  if (user && user.role !== "admin" && !user.subscription.includes(params.id)) {
    return navigate("/");
  }
  async function fetchLectures() {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_SERVER}/api/lectures/${params.id}`,
        {
          withCredentials: true,
        }
      );
      setLectures(data.lectures);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  async function fetchLecture(id) {
    setLecLoading(true);
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_SERVER}/api/lecture/${id}`,
        {
          withCredentials: true,
        }
      );
      setLecture(data.lecture);
      setLecLoading(false);
    } catch (error) {
      console.log(error);
      setLecLoading(false);
    }
  }

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="flex flex-col md:flex-row gap-6 text-white p-4">
          {/* Left: Video Player */}
          <div className="flex-1 bg-gray-900 rounded p-4">
            {lecLoading ? (
              <Loading />
            ) : lecture && lecture.video ? (
              <>
                <div className="aspect-video w-full rounded overflow-hidden bg-black">
                  <video
                    src={lecture.video}
                    controls
                    autoPlay
                    className="w-full h-full object-contain"
                    controlsList="nodownload nofullscreen noremoteplayback"
                    disablePictureInPicture
                    disableRemotePlayback
                  />
                </div>
                <h1 className="mt-4 text-2xl font-semibold">{lecture.title}</h1>
                <h3 className="text-gray-300 mt-2">{lecture.description}</h3>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center space-y-2">
                <FaVideo className="w-12 h-12 text-gray-500" />
                <h2 className="text-xl font-medium text-gray-400">
                  Select a lecture to begin
                </h2>
              </div>
            )}
          </div>

          {/* Right: Lecture List - Always visible */}
          <div className="w-full md:w-1/3 space-y-3">
            <h3 className="text-xl font-bold mb-2">Lectures</h3>
            {lectures.map((lec, index) => (
              <div
                key={lec._id}
                onClick={() => fetchLecture(lec._id)}
                className={`cursor-pointer p-3 rounded bg-gray-800 hover:bg-gray-700 transition ${
                  lecture && lecture._id === lec._id
                    ? "border border-blue-500"
                    : ""
                }`}
              >
                <p className="font-medium">
                  <span className="text-gray-400 mr-2">{index + 1}.</span>
                  {lec.title}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Lecture;
