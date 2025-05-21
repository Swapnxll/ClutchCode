import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const CourseEdit = () => {
  const { id } = useParams();
  const [lectures, setLectures] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    video: null,
  });

  useEffect(() => {
    if (!id) return;
    const fetchLectures = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `${import.meta.env.VITE_SERVER}/api/lectures/${id}`,
          {
            withCredentials: true,
          }
        );
        setLectures(res.data.lectures || []);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchLectures();
  }, [id]);

  const handleDelete = async (lectureId) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_SERVER}/api/lecture/${lectureId}`,
        {
          withCredentials: true,
        }
      );
      setLectures((prev) => prev.filter((lec) => lec._id !== lectureId));
      if (selectedVideo && selectedVideo._id === lectureId)
        setSelectedVideo(null);
    } catch (err) {
      alert("Failed to delete lecture", err.message);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("file", formData.video);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_SERVER}/api/course/${id}`,
        data,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setLectures([...lectures, res.data.lecture]);
      setShowForm(false);
      setFormData({ title: "", description: "", video: null });
    } catch (err) {
      alert("Upload failed", err.message);
    }
  };

  if (loading) return <p>Loading lectures...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div className="p-6 space-y-6 text-white bg-neutral-900 min-h-screen">
      <h1 className="text-2xl font-bold">Edit Course: </h1>

      <button
        onClick={() => setShowForm(true)}
        className="bg-blue-600 px-4 py-2 rounded"
      >
        Add Lecture
      </button>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <form
            onSubmit={handleFormSubmit}
            className="bg-neutral-800 p-6 rounded-lg w-full max-w-md space-y-4 shadow-xl"
          >
            <h2 className="text-xl font-bold text-white">Add Lecture</h2>

            <input
              type="text"
              placeholder="Title"
              required
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="w-full px-4 py-2 rounded-md bg-neutral-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-neutral-800 transition duration-200"
            />

            <textarea
              placeholder="Description"
              required
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full px-4 py-2 rounded-md bg-neutral-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-neutral-800 transition duration-200"
            />

            <input
              type="file"
              accept="video/*"
              required
              onChange={(e) =>
                setFormData({ ...formData, video: e.target.files[0] })
              }
              className="w-full px-4 py-2 rounded-md bg-neutral-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-neutral-800 transition duration-200"
            />

            <div className="flex justify-end space-x-3">
              <button
                type="submit"
                className="bg-green-600 px-4 py-2 rounded text-white"
              >
                Submit
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="bg-gray-600 px-4 py-2 rounded text-white"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
      {selectedVideo ? (
        <div className="mb-6">
          <video
            controls
            src={selectedVideo.video}
            className="w-full max-w-3xl rounded shadow-md"
          />
          <p className="mt-2 text-lg font-semibold">{selectedVideo.title}</p>
        </div>
      ) : (
        <p className="text-gray-400">Select a lecture to play the video</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {lectures.length === 0 ? (
          <p>No lectures found for this course.</p>
        ) : (
          lectures.map((lecture) => (
            <div
              key={lecture._id}
              className="bg-neutral-800 rounded-lg p-4 shadow-md"
            >
              <h2
                className="font-semibold mb-2 cursor-pointer hover:text-blue-400"
                onClick={() => setSelectedVideo(lecture)}
              >
                {lecture.title}
              </h2>
              <p className="text-sm text-gray-300">{lecture.description}</p>
              <div className="mt-3 flex justify-between">
                <button
                  onClick={() => handleDelete(lecture._id)}
                  className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CourseEdit;
