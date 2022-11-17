import { Routes, Route } from 'react-router-dom';
import Home from "./pages/home/home";
import CharacterStepper from "./pages/characterLink/characterStepper"
import Help from "./pages/help/help";
import LoginForm from './pages/login/LoginForm'

export default function Content() {
    return (
        <Routes>
          <Route
            path="/"
            element={<Home monsters />}
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
          <Route
            path="/login"
            element={<LoginForm />}
          />
        </Routes>
    );
  }