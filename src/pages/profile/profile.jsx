import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../contexts/user.context";
export default function Profile() {
  const { currentUser } = useContext(UserContext);

  return (
    <div className="App-header">
      <h3 className="page-title">Profile</h3>
      <Link
        to="/characterlink"
        className="flex items-center"
      >
        Link FFXIV character to profile
      </Link>
    </div>
  );
}
