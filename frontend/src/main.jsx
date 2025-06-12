import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { UserContextProvider } from "./context/UserContext.jsx";
import { CourseContextProvider } from "./context/CourseContext.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";

export const server = "http://localhost:8080";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={`${import.meta.env.VITE_CLIENT_ID}`}>
      <UserContextProvider>
        <CourseContextProvider>
          <App />
        </CourseContextProvider>
      </UserContextProvider>
    </GoogleOAuthProvider>
  </StrictMode>
);
