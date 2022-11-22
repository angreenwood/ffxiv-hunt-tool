// react import
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// devextreme imports
import { LoadPanel } from "devextreme-react/load-panel";
import Form, {
  Item,
  GroupItem,
  ColCountByScreen,
  Label,
  ButtonItem,
  SimpleItem,
} from "devextreme-react/form";
import { Popup, Position, ToolbarItem } from "devextreme-react/popup";
import notify from "devextreme/ui/notify";
// firestore import
import { getFirestore, doc, setDoc } from "firebase/firestore";
// material UI import
import Button from "@mui/material/Button";
// custom scss import
import "./characterLink.scss";

const CharacterResults = ({ handleBack, handleNext }) => {
  const [serverList, setServerList] = useState({});
  const [loading, setLoading] = useState(true);
  const [popup, setPopup] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const character = localStorage.getItem("searchName");
    const server = localStorage.getItem("searchServer");
    fetch(
      "https://xivapi.com/character/search?name=" +
        character +
        "&server=" +
        server
    )
      .then((response) => response.json())
      .then((data) => {
        setServerList(data.Results);
        setLoading(false);
      });
  }, []);

  // popup handlers
  const handleClick = (item) => {
    localStorage.setItem("linkName", item.Name);
    localStorage.setItem("linkID", item.ID);
    setPopup(true);
  };

  const hidePopup = () => {
    setPopup(!popup);
  };

  const closeButtonOptions = {
    text: "Cancel",
    onClick: hidePopup,
  };

  const handleLink = async () => {
    setLoading(true);
    const db = getFirestore();
    const uid = localStorage.getItem("UID");
    const ffxivId = localStorage.getItem("linkID");
    const docRef = doc(db, "users", uid);
    try {
      const updateRecord = await setDoc(
        docRef,
        { ffxivId: ffxivId },
        { merge: true }
      );
      setLoading(false);
      hidePopup();
      notify(
        {
          message: "Account linked",
          width: 300,
          shading: false,
          position: "top center",
        },
        "success",
        3000
      );
      navigate("/");
    } catch (e) {
      setLoading(false);
      hidePopup();
      notify(
        {
          message: e,
          width: 300,
          shading: false,
          position: "top center",
        },
        "error",
        3000
      );
    }
  };

  const linkButtonOptions = {
    icon: "link",
    text: "Link",
    onClick: handleLink,
  };

  const renderContent = () => {
    return (
      <div className="popup-div">
        <h1 className="zone-h1 link-h1">Character Link</h1>
        <p className="link-p">
          Are you sure you want to link{" "}
          <b>{localStorage.getItem("linkName")}</b> to your wiki docs account?
        </p>
      </div>
    );
  };

  if (!loading && serverList.length > 0) {
    return (
      <div className="App-header character-select">
        <h3 className="page-title">Search Results</h3>
        <Form className="monster-section">
          <GroupItem colCount={4}>
            <ColCountByScreen
              xs={1}
              sm={1}
            />
            {serverList.map((item, i) => (
              <Item key={i}>
                <div className="monster-border">
                  <img
                    src={item.Avatar}
                    alt={item.Name}
                    className="center monster-img character-pic"
                  />
                  <h3 className="center title">{item.Name}</h3>
                  <p className="center description">{item.Server}</p>
                  <Button
                    onClick={() => {
                      handleClick(item);
                    }}
                  >
                    Link Character
                  </Button>
                </div>
              </Item>
            ))}
          </GroupItem>
          <GroupItem>
            <Item>
              <Button
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
            </Item>
          </GroupItem>
        </Form>
        <Popup
          visible={popup}
          showCloseButton={true}
          onHiding={hidePopup}
          contentRender={renderContent}
          height={"auto"}
          width={"auto"}
          hideOnOutsideClick={true}
        >
          <ToolbarItem
            widget="dxButton"
            toolbar="bottom"
            location="after"
            options={linkButtonOptions}
          />
          <ToolbarItem
            widget="dxButton"
            toolbar="bottom"
            location="before"
            options={closeButtonOptions}
          />
        </Popup>
      </div>
    );
  }
  if (loading) {
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
  if (!loading && serverList.length === 0) {
    return (
      <div className="error-msg">
        <h3 className="center title">No Results Found!</h3>
        <Button
          onClick={handleBack}
          sx={{ mr: 1 }}
        >
          Back
        </Button>
      </div>
    );
  }
};

export default CharacterResults;
