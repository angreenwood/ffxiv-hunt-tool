// react import
import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
// devextreme import
import { LoadPanel } from "devextreme-react/load-panel";
import Form, { Item, GroupItem, ColCountByScreen } from "devextreme-react/form";
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
// custom scss
import { CgProfile } from "react-icons/cg";
import { AiFillEdit } from "react-icons/ai";
import "./profile.scss";
export default function Profile() {
  const [playerData, setPlayerData] = useState();
  const [server, setServer] = useState();
  const [playerName, setPlayerName] = useState();
  const [playerAvatar, setPlayerAvatar] = useState();
  const [freeCompany, setFreeCompany] = useState();
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
  const getPlayerData = (ffxivId) => {
    fetch("https://xivapi.com/character/" + ffxivId)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setServer(data.Character.Server);
        setPlayerName(data.Character.Name);
        setPlayerAvatar(data.Character.Avatar);
        setPlayerData(data.Character.ClassJobs);
        setFreeCompany(data.Character.FreeCompanyName);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  };
  const getData = async () => {
    const q = query(colRef, where("uid", "==", localStorage.getItem("UID")));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setUser({ ...doc.data(), id: doc.id });
      if (doc.data().ffxivId) {
        const ffxivId = doc.data().ffxivId;
        getPlayerData(ffxivId);
      } else {
        setLoading(false);
      }
    });
  };
  useEffect(() => {
    getData();
  }, []);

  if (!loading) {
    if (playerData) {
      return (
        <section className="pt-1 dark">
          <div className="w-full lg:w-4/12 px-4 mx-auto">
            <div className="relative flex flex-col min-w-0 break-words card-bg w-full mb-6 shadow-xl rounded-lg mt-16">
              <div className="px-6">
                <div className="flex flex-wrap justify-center">
                  <div className="w-full px-4 flex justify-center">
                    <div className="relative mt-12">
                      <img
                        src={playerAvatar}
                        alt="profile pic"
                        className="player-avatar"
                      />
                    </div>
                  </div>
                  <div className="text-center mt-12">
                    <h3 className="text-xl font-semibold leading-normal mb-1">
                      {playerName}
                    </h3>
                    <div className="text-sm leading-normal mt-0 mb-6 font-bold uppercase">
                      <p>
                        <em>{freeCompany}</em>
                      </p>
                      {server}
                    </div>
                    <Item>
                      <em>
                        <p className="character-info-p">Character Info</p>
                      </em>
                    </Item>
                    <div class="grid grid-cols-4 gap-4">
                      {playerData.map((item, i) => (
                        <div
                          className="job-list"
                          key={i}
                        >
                          <img
                            src={"./images/jobs/" + item.JobID + ".png"}
                            alt={item.image}
                            className="job-img"
                          />
                          <p className="center description">{item.Level}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>{" "}
                <div className="flex justify-center py-4 lg:pt-4 pt-8"></div>
              </div>
            </div>
          </div>
        </section>
      );
    } else {
      return (
        <section className="pt-16 dark">
          <div className="w-full lg:w-4/12 px-4 mx-auto">
            <div className="relative flex flex-col min-w-0 break-words card-bg w-full mb-6 shadow-xl rounded-lg mt-16">
              <div className="px-6">
                <div className="flex flex-wrap justify-center">
                  <div className="w-full px-4 flex justify-center">
                    <div className="relative mt-12">
                      <CgProfile size="150" />
                    </div>
                  </div>
                  <div className="text-center mt-12">
                    <h3 className="text-xl font-semibold leading-normal mb-2">
                      {user.displayName}
                      <AiFillEdit className="inline icon" />
                    </h3>
                  </div>
                </div>{" "}
                <div className="flex justify-center py-4 lg:pt-4 pt-8"></div>
              </div>
              <div className="mt-10 py-10 border-t border-blueGray-200 text-center brd-clr">
                <div className="flex flex-wrap justify-center">
                  <div className="w-full lg:w-9/12 px-4">
                    <Link to="/characterlink">Link FFXIV Character</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      );
    }
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
