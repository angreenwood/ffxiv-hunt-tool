// react import
import { Routes, Route } from "react-router-dom";
// pages - components imports
import Home from "./pages/home/home";
import CharacterStepper from "./pages/characterLink/characterStepper";
import Help from "./pages/help/help";
import LoginForm from "./pages/login/LoginForm";
import Profile from "./pages/profile/profile";
import SignUp from "./pages/signUp/signUp";
import Privacy from "./pages/privacy/privacyStatement";
// passing user object to content to check if user is logged in. conditionally rendering routes based on whether a user is logged in
export default function Content({ user }) {
  return (
    <Routes>
      <Route
        path="/"
        element={<Home />}
      />
      <Route
        path="/huntselection"
        element={<Home />}
      />
      <Route
        path="/characterlink"
        element={<CharacterStepper />}
      />
      <Route
        path="/help"
        element={<Help />}
      />
      {!user ? (
        <Route
          path="/login"
          element={<LoginForm />}
        />
      ) : (
        <Route
          path="/login"
          element={<Home />}
        />
      )}
      <Route
        path="/profile"
        element={<Profile />}
      />
      <Route
        path="/signup"
        element={<SignUp />}
      />
      <Route
        path="/privacy"
        element={<Privacy />}
      />
    </Routes>
  );
}
