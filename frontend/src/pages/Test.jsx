import React, { useState } from "react";
import axios from "axios";

const Test = () => {
  const [file, setFile] = useState(null);
  const [response, setResponse] = useState(null);

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return alert("Please select a file.");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post("http://localhost:8080/upload", formData);
      setResponse(res.data);
    } catch (error) {
      console.error("Upload failed", error);
      alert("Upload failed");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Test File Upload</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>

      {/* Hardcoded Cloudinary video player */}
      <div style={{ marginTop: "30px" }}>
        <h3>Cloudinary Video Preview</h3>
        <video width="480" controls>
          <source
            src="https://res.cloudinary.com/do48h78id/video/upload/v1747684125/cpisi69lhiecya0cmqiq.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Optional: response from your own API */}
      {response && (
        <div style={{ marginTop: "20px" }}>
          <p>
            <strong>Message:</strong> {response.message}
          </p>
          <p>
            <strong>Filename:</strong> {response.filename}
          </p>
          {response.path.endsWith(".mp4") ? (
            <video width="300" controls>
              <source
                src={`http://localhost:8080${response.path}`}
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          ) : (
            <img
              src={`http://localhost:8080${response.path}`}
              alt="Uploaded"
              style={{ maxWidth: "300px" }}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Test;
