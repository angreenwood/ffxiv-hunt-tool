// google firestore import
import { getFirestore, collection, getDocs } from "firebase/firestore/lite";
import React, { useState, useEffect } from "react";
// devextreme import
import Form, {
  Item,
  GroupItem,
  ColCountByScreen,
  Label,
  SimpleItem,
} from "devextreme-react/form";
import { Popup } from "devextreme-react/popup";
import { LoadPanel } from "devextreme-react/load-panel";
// custom scss import
import "./home.scss";

export default function Home() {
  // init loading wheel state
  const [loading, setLoading] = useState(true);
  // init formdata state
  const [data, setData] = useState({
    searchData: "",
  });
  // init devextreme groupitem colCount state
  const [colCount, setColCount] = useState(4);
  // init devextreme popup state
  const [popup, setPopup] = useState(false);
  // init devextreme form - user search data state
  const [searchResult, setSearchResult] = useState([]);
  // init get all monsters from firestore database state
  const [monsters, setMonsters] = useState([]);
  // init filter monsters listed based on users search entry state
  const [filteredMonsters, setFilteredMonsters] = useState([]);
  // firestore declarations
  const db = getFirestore();
  const colRef = collection(db, "monsters");
  // define popup that displays map of monster location
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
      setFilteredMonsters(result);
      setMonsters(result);
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
      const findMonsters = monsters.filter(function (data) {
        return data.monster.toLowerCase().startsWith(targetValue);
      });
      if (findMonsters.length < 2) {
        setColCount(1);
      } else {
        setColCount(findMonsters.length);
      }
      setFilteredMonsters(findMonsters);
    } else {
      setFilteredMonsters(monsters);
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
            {filteredMonsters.map((item, i) => (
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
