import React from "react";
import Header from "./components/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Courses from "./pages/Courses";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Verify from "./pages/auth/Verify";
import Footer from "./components/Footer";
import Account from "./pages/Account";
import { UserData } from "./context/UserContext";
import Test from "./pages/Test";
import Sheet from "./pages/Sheet";
import Loading from "./components/Loading";
import CourseDescription from "./pages/CourseDescription";
import PaymentSuccess from "./pages/PaymentSuccess";
import Dashboard from "./pages/Dashboard";
import CourseStudy from "./pages/CourseStudy";
import Lecture from "./pages/Lecture";
const App = () => {
  const { isAuth, user, loading } = UserData();
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <BrowserRouter>
          <div className="min-h-screen flex flex-col">
            <Header isAuth={isAuth} />
            <main className="flex-grow">
              <Routes>
                <Route path="/test" element={<Test />} />
                <Route path="/" element={<Home user={user} />} />
                <Route path="/courses" element={<Courses />} />
                <Route path="/sheet" element={<Sheet />} />
                <Route path="/login" element={isAuth ? <Home /> : <Login />} />
                <Route
                  path="/register"
                  element={isAuth ? <Home /> : <Register />}
                />
                <Route
                  path="/verify"
                  element={isAuth ? <Home /> : <Verify />}
                />
                <Route
                  path="/account"
                  element={isAuth ? <Account user={user} /> : <Login />}
                />
                <Route
                  path="/courses/:id"
                  element={
                    isAuth ? <CourseDescription user={user} /> : <Login />
                  }
                />
                <Route
                  path="/payment-success/:id"
                  element={isAuth ? <PaymentSuccess user={user} /> : <Login />}
                />
                <Route
                  path="/:id/dashboard"
                  element={isAuth ? <Dashboard user={user} /> : <Login />}
                />
                <Route
                  path="/course/study/:id"
                  element={isAuth ? <CourseStudy user={user} /> : <Login />}
                />
                <Route
                  path="/lectures/:id"
                  element={isAuth ? <Lecture user={user} /> : <Login />}
                />
              </Routes>
            </main>
            <Footer />
          </div>
        </BrowserRouter>
      )}
    </>
  );
};

export default App;
