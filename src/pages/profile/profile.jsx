import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../contexts/user.context";
export default function Profile() {
  const { currentUser } = useContext(UserContext);
  useEffect(() => {
    console.log(currentUser);
  }, []);
  return (
    <div className="App-header">
      <h1>{currentUser.email}'s User Profile</h1>
    </div>
  );
}
