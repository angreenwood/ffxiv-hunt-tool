import React, { useState, useEffect } from "react";
import "devextreme/dist/css/dx.common.css";
import "devextreme/dist/css/dx.light.css";
import "./App.css";
import NavBar from "./components/navbar";
import { Route, Routes, Link } from "react-router-dom";
import Home from "./pages/home/home";
import HuntSelection from "./pages/huntSelection/huntSelection";
import Help from "./pages/help/help";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore/lite";

function App() {
  const [monsters, setMonsters] = useState([]);
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

  const db = getFirestore();
  const colRef = collection(db, "creature-table");
  useEffect(() => {
    getDocs(colRef).then((snapshot) => {
      snapshot.docs.forEach((doc) => {
        monsters.push({ ...doc.data(), id: doc.id });
      });
      console.log(monsters);
    });
  }, []);

  return (
    <>
      <NavBar />

      <Routes>
        <Route
          path="/"
          element={<Home />}
        />
        <Route
          path="/huntselection"
          element={<HuntSelection />}
        />
        <Route
          path="/help"
          element={<Help />}
        />
      </Routes>
    </>
  );
}
export default App;
