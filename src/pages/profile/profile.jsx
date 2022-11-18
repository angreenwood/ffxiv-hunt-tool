import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../contexts/user.context";
export default function Profile() {
  const { currentUser } = useContext(UserContext);
  useEffect(() => {
    console.log(currentUser);
  }, []);
  return (
    <div className="form-header">
      <h1>{currentUser.email}'s User Profile</h1>
      <Link
        to="/characterlink"
        className="flex items-center"
      >
        Link FFXIV character to profile
      </Link>
    </div>
  );
}
