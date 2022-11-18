import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/home";
import CharacterStepper from "./pages/characterLink/characterStepper";
import Help from "./pages/help/help";
import LoginForm from "./pages/login/LoginForm";
import Profile from "./pages/profile/profile";
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
    </Routes>
  );
}
