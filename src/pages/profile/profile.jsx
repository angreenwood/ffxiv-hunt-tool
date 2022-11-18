import React, { useState, useEffect } from "react";

export default function Profile() {
  const [user, setUser] = useState();
  useEffect(() => {
    setUser(sessionStorage.getItem("User"));
  }, []);
  return (
    <div>
      <h1>{user}</h1>
    </div>
  );
}
