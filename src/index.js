import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
// provider imports
import { UserProvider } from "./contexts/user.context.jsx";
import { ThemeProvider } from "@material-tailwind/react";
// styling import
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
// app is wrapped with react router, user provider 'defines current user', and theme provider 'tailwind'
root.render(
  <>
    <BrowserRouter>
      <UserProvider>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </UserProvider>
    </BrowserRouter>
  </>
);
