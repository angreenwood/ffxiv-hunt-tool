// react import
import { Routes, Route, Navigate } from "react-router-dom";
// pages - components imports
import Home from "./pages/home/home";
import Hunt from "./pages/hunt/hunt";
import Help from "./pages/help/help";
import LoginForm from "./pages/login/LoginForm";
import SignUp from "./pages/signUp/signUp";
import Privacy from "./pages/privacy/privacyStatement";
// passing user object to content to check if user is logged in. conditionally rendering routes based on whether a user is logged in
export default function Content() {
  return (
    <Routes>
      <Route
        path="/"
        element={<Home />}
      />
      <Route
        path="/hunt"
        element={<Hunt />}
      />
      <Route
        path="/huntselection"
        element={<Home />}
      />
      <Route
        path="/help"
        element={<Help />}
      />
      <Route
        path="/login"
        element={<LoginForm />}
      />

      <Route
        path="/signup"
        element={<SignUp />}
      />
      <Route
        path="/privacy"
        element={<Privacy />}
      />
      <Route
        path="*"
        element={
          <Navigate
            to="/"
            replace
          />
        }
      />
    </Routes>
  );
}
