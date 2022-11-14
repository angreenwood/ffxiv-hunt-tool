import React, { useState } from "react";
import Form, { ButtonItem, GroupItem, SimpleItem,  RequiredRule, } from "devextreme-react/form";

const HuntSelection = () => {
  const [data, setData] = useState({
    Expansion: "",
  });
  const buttonOptions = {
    text: "Submit",
    type: "success",
    useSubmitBehavior: true,
  };
  const handleSubmit = () => {
    console.log("Submit")
  }

  const expansionOptions = {
    items: ["A Realm Reborn", "Heavensward","Stormblood","Shadowbringers","Endwalker",],
    searchEnabled: true,
  }
  return (
    <div className="App">
      <header className="App-header">
      <form onSubmit={handleSubmit}>
        <Form
          colCount={1}
          id="form"
          formData={data}
          showValidationSummary={true}
        >
        <SimpleItem
              dataField="Expansion"
              editorType="dxSelectBox"
              editorOptions={expansionOptions}>
              <RequiredRule message="Please select expansion" />
              </SimpleItem>
              <ButtonItem horizontalAlignment="right"
              buttonOptions={buttonOptions}
            />
        </Form>
        </form>
      </header>
    </div>
  );
};

export default HuntSelection;
