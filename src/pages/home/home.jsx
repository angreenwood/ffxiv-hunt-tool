import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore/lite";
import React, { useState, useEffect } from "react";
import Form, {
  Item,
  GroupItem,
  ColCountByScreen,
  Label,
  ButtonItem,
  SimpleItem,
} from "devextreme-react/form";
import { Button } from "devextreme-react/button";
import { Popup, Position, ToolbarItem } from "devextreme-react/popup";
import "./home.scss";
import { LoadPanel } from "devextreme-react/load-panel";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    searchData: "",
  });
  const [colCount, setColCount] = useState(4);
  const [popup, setPopup] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const [labyrinthos, setLabyrinthos] = useState([]);
  const [filteredLabyrinthos, setFilteredLabyrinthos] = useState([]);
  const db = getFirestore();
  const colRef = collection(db, "monsters");

  const renderContent = (item) => {
    return (
      <div className="App-header">
        <h1 className="zone-h1">{localStorage.getItem("zone")}</h1>
        <h1 className="monster-h1">
          <em>{localStorage.getItem("monster")}</em>
        </h1>
        <img
          src={"./images/maps/" + localStorage.getItem("map")}
          alt={"map"}
          className="map-img"
        />
      </div>
    );
  };
  const hidePopup = () => {
    setPopup(!popup);
    console.log(popup);
  };

  const clicker = (item) => {
    localStorage.setItem("map", item.area_map);
    localStorage.setItem("zone", item.zone);
    localStorage.setItem("monster", item.monster);
    setPopup(!popup);
  };
  const getData = () => {
    let result = [];
    getDocs(colRef).then((snapshot) => {
      snapshot.docs.forEach((doc) => {
        result.push({ ...doc.data(), id: doc.id });
      });
      setFilteredLabyrinthos(result);
      setLabyrinthos(result);
      setLoading(false);
    });
  };

  useEffect(() => {
    getData();
  }, []);

  const handleChange = (e) => {
    const targetField = e.dataField;
    const targetValue = e.value.toLowerCase();
    console.log(targetField, targetValue);
    if (targetValue !== "") {
      const findLabyrinthos = labyrinthos.filter(function (data) {
        return data.monster.toLowerCase().startsWith(targetValue);
      });
      if (findLabyrinthos.length < 2) {
        setColCount(1);
      } else {
        setColCount(findLabyrinthos.length);
      }
      setFilteredLabyrinthos(findLabyrinthos);
    } else {
      setFilteredLabyrinthos(labyrinthos);
      setColCount(4);
    }
  };

  const searchOptions = {
    valueChangeEvent: "keyup",
  };

  if (!loading && !searchResult.length) {
    return (
      <div className="App-header">
        <Form
          formData={data}
          onFieldDataChanged={handleChange}
          className="searchbar"
        >
          <SimpleItem
            dataField="searchData"
            editorType="dxTextBox"
            editorOptions={searchOptions}
          >
            <Label text="Search"></Label>
          </SimpleItem>
        </Form>
        <Form className="monster-section">
          <GroupItem colCount={colCount}>
            <ColCountByScreen
              xs={1}
              sm={1}
            />
            {filteredLabyrinthos.map((item, i) => (
              <Item key={i}>
                <div className="monster-border">
                  <button onClick={(e) => clicker(item, e)}>
                    <img
                      src={"./images/monsters/" + item.monster_url}
                      alt={item.monster}
                      className="center monster-img"
                    />
                    <h3 className="center title">{item.monster}</h3>
                    <p className="center description">{item.zone}</p>
                    <p className="center description">{item.area}</p>
                  </button>
                </div>
              </Item>
            ))}
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
        />
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
  if (!loading && data.searchData) {
    <div>
      <h1>test</h1>
    </div>;
  }
}
