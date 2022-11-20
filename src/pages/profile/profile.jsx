// react import
import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
// devextreme import
import { LoadPanel } from "devextreme-react/load-panel";
// firestore import
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore/lite";
// user context import
import { UserContext } from "../../contexts/user.context";
export default function Profile() {
  // init current user from context
  const { currentUser } = useContext(UserContext);
  // defining user object
  const [user, setUser] = useState();
  // defining loading popup state
  const [loading, setLoading] = useState(true);
  // defining firestore collection info
  const db = getFirestore();
  const colRef = collection(db, "users");
  // query to get user object where email matches the email the user logged into the website with. this is needed  to get more user info that is stored in the 'users' collection in the firestore.
  const getData = async () => {
    const q = query(colRef, where("email", "==", currentUser.email));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      setUser({ ...doc.data(), id: doc.id });
    });
    console.log(user.displayName);
    setLoading(false);
  };
  useEffect(() => {
    getData();
  }, []);

  if (!loading) {
    return (
      <div className="App-header">
        <h3 className="page-title">Profile</h3>
        <p>Welcome {user.displayName}!</p>
        <Link
          to="/characterlink"
          className="flex items-center"
        >
          Link FFXIV character to profile
        </Link>
      </div>
    );
  } else {
    return (
      <div>
        <LoadPanel
          shadingColor="rgba(0,0,0,0.6)"
          position="center"
          visible={true}
          showIndicator={true}
          shading={true}
          showPane={true}
        />
      </div>
    );
  }
}
