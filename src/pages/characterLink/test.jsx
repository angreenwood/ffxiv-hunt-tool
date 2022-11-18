import React, { useState, useEffect } from "react";
import { LoadPanel } from "devextreme-react/load-panel";
import Form, {
  Item,
  GroupItem,
  ColCountByScreen,
  Label,
  ButtonItem,
  SimpleItem,
} from "devextreme-react/form";
import Button from "@mui/material/Button";
import "./characterLink.scss";

const Test = ({ handleBack, handleNext }) => {
  const [serverList, setServerList] = useState({});
  const [loading, setLoading] = useState(true);
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
        console.log(data.Results);
      });
  }, []);

  const buttonOptions = {
    text: "Back",
    type: "default",
    useSubmitBehavior: true,
    onClick: handleBack,
  };

  if (!loading && serverList.length > 0) {
    return (
      <div className="App-header">
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
                    alt={item.monster}
                    className="center monster-img character-pic"
                  />
                  <h3 className="center title">{item.Name}</h3>
                  <p className="center description">{item.Server}</p>
                </div>
              </Item>
            ))}
          </GroupItem>
          <ButtonItem
            horizontalAlignment="right"
            buttonOptions={buttonOptions}
          />
        </Form>
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

export default Test;
