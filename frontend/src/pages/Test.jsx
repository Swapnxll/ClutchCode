import React, { useEffect } from "react";
import axios from "axios";

const Test = () => {
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await axios.post(
          `http://localhost:8080/api/user/profile`,
          {},
          {
            withCredentials: true,
          }
        );
        console.log("Profile Data:", data);
      } catch (error) {
        console.error("Error fetching profile:", error.response?.data || error);
      }
    };

    fetchProfile();
  }, []);

  return <div>Check the console for profile data</div>;
};

export default Test;
