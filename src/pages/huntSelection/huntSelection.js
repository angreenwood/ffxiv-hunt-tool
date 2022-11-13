import React, { useState } from "react";
import Form, { ButtonItem, GroupItem, Item } from "devextreme-react/form";

const HuntSelection = () => {
  const [data, setData] = useState({
    FirstName: "Test",
    Email: "Test.com",
  });
  const buttonOptions = {
    text: "Submit",
    type: "success",
    useSubmitBehavior: true,
  };
  return (
    <div className="App">
      <header className="App-header">
        <Form
          colCount={1}
          id="form"
          formData={data}
        >
          <Item dataField="FirstName" />
          <Item dataField="Email" />
          <ButtonItem
            horizontalAlignment="right"
            buttonOptions={buttonOptions}
          />
        </Form>
      </header>
    </div>
  );
};

export default HuntSelection;
