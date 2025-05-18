import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
// import { server } from "../main";

const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState([]);
  const [isAuth, setIsAuth] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const [loading, setLoading] = useState(true);

  async function loginUser(email, password, navigate) {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_SERVER}/api/user/login`,
        { email, password },
        { withCredentials: true }
      );

      setUser(data.user);
      setIsAuth(true);
      setBtnLoading(false);
      navigate("/");

      toast.success(data.message);
    } catch (error) {
      setBtnLoading(false);
      setIsAuth(false);
      toast.error(error.response.data.message);
      console.error(error);
    }
  }

  async function fetchUser() {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_SERVER}/api/user/profile`,
        {},
        {
          withCredentials: true,
        }
      );

      setIsAuth(true);
      setUser(data.user);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        setIsAuth,
        isAuth,
        loginUser,
        btnLoading,
        fetchUser,
        loading,
      }}
    >
      {children}
      <Toaster />
    </UserContext.Provider>
  );
};

export const UserData = () => useContext(UserContext);
