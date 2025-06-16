import React, { useEffect, useState } from "react";
import Loading from "../components/Loading";
const DemoLecture = () => {
  const [loading, setLoading] = useState(true);

  // Set this to your actual backend stream route
  const videoStreamUrl = `${import.meta.env.VITE_SERVER}/api/demo-stream`;

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center p-6">
      <div className="max-w-4xl w-full space-y-6">
        {loading ? (
          <Loading />
        ) : (
          <>
            <div className="aspect-video w-full rounded overflow-hidden bg-black">
              <video
                src={videoStreamUrl}
                controls
                autoPlay
                className="w-full h-full object-contain"
                controlsList="nodownload nofullscreen noremoteplayback"
                disablePictureInPicture
                disableRemotePlayback
              />
            </div>

            <div>
              <h1 className="text-3xl font-semibold">Demo</h1>
              <p className="text-gray-400 mt-2">
                This is a demo lecture using <strong>streams</strong> for secure
                video delivery without exposing the Cloudinary URL.
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DemoLecture;
