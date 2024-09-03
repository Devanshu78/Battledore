import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BackendProvider } from "./ContextAPI/connectToBackend.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Welcome,
  Login,
  Signup,
  Home,
  Players,
  Events,
  Recent_Event,
  Weekely_Event,
  Upcoming_Event,
  LiveScore,
  PastMatch,
  Courts,
  Setting,
  ForgotPassword,
} from "./pages/pages.js";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Welcome />} />
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />
      <Route path="forgotpassword" element={<ForgotPassword />} />
      <Route element={<App />}>
        <Route path="home" element={<Home />} />
        <Route path="players" element={<Players />} />
        <Route path="livescore" element={<LiveScore />} />
        <Route path="events" element={<Events />}>
          <Route path="" element={<Recent_Event />} />
          <Route path="weekely" element={<Weekely_Event />} />
          <Route path="upcoming" element={<Upcoming_Event />} />
        </Route>
        <Route path="pastmatches" element={<PastMatch />} />
        <Route path="courts" element={<Courts />} />
        <Route path="user/setting" element={<Setting />} />
      </Route>
    </>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BackendProvider>
      <RouterProvider router={router} />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        // transition: Bounce,
      />
    </BackendProvider>
  </StrictMode>
);
