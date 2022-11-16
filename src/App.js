import React from "react";
import "devextreme/dist/css/dx.common.css";
import "devextreme/dist/css/dx.light.css";
import "./App.css";
import NavBar from "./components/navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/home";
import CharacterSearch from "./pages/characterLink/characterSearch";
import CharacterStepper from "./pages/characterLink/characterStepper"
import Help from "./pages/help/help";
import { initializeApp } from "firebase/app";

function App() {
  const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
  };

  initializeApp(firebaseConfig);


  return (
    <React.Fragment>
      <NavBar />
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
      </Routes>
    </React.Fragment>
  );
}
export default App;
