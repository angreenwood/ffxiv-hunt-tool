import React, { useState, useEffect } from "react";
import Form, {
  ButtonItem,
  GroupItem,
  SimpleItem,
  RequiredRule,
} from "devextreme-react/form";

import "./characterLink.scss";

const HuntSelection = ({ handleBack, handleNext }) => {
  const [data, setData] = useState({
    CharacterName: "",
    Server: "",
  });
  const [character, setCharacter] = useState();
  const [apiResponse, setApiResponse] = useState({});
  const [serverList, setServerList] = useState({});

  async function search() {
    const response = await fetch(
      "https://xivapi.com/character/search?name=http+lovecraft&server=Exodus"
    );
    // waits until the request completes...
    const data = await response.json();
    console.log(data["Results"]);
  }

  const handleSubmit = () => {
    localStorage.setItem("searchName", data.CharacterName);
    localStorage.setItem("searchServer", data.Server);
  };

  const serverOptions = {
    items: serverList,
    searchEnabled: true,
  };
  const handleChange = (e) => {
    const targetField = e.dataField;
    const targetValue = e.value;
    setData((prevState) => ({
      ...prevState,
      [targetField]: targetValue,
    }));
  };
  const buttonOptions = {
    text: "Search",
    type: "default",
    useSubmitBehavior: true,
    onClick: function () {
      handleSubmit();
    },
  };

  useEffect(() => {
    fetch("https://xivapi.com/servers")
      .then((response) => response.json())
      .then((data) => setServerList(data));
  }, []);

  return (
    <div className="App">
      <div className="App-header">
        <h3 className="page-title">Link FFXIV Character</h3>
        <form
          onSubmit={handleNext}
          action=""
          className="character-search-form"
        >
          <Form
            colCount={1}
            formData={data}
            showValidationSummary={true}
            onFieldDataChanged={handleChange}
          >
            <SimpleItem
              dataField="CharacterName"
              editorType="dxTextBox"
            >
              <RequiredRule message="Please enter your character name" />
            </SimpleItem>
            <SimpleItem
              dataField="Server"
              editorType="dxSelectBox"
              editorOptions={serverOptions}
            >
              <RequiredRule message="Please select a server" />
            </SimpleItem>
            <ButtonItem
              horizontalAlignment="right"
              buttonOptions={buttonOptions}
            />
          </Form>
        </form>
      </div>
    </div>
  );
};

export default HuntSelection;
