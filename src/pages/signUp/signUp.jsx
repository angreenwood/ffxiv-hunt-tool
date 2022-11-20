// react imports
import React, { useCallback, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
// user context import
import { UserContext } from "../../contexts/user.context";
// devextreme imports
import notify from "devextreme/ui/notify";
import Form, {
  Item,
  ButtonItem,
  ButtonOptions,
  SimpleItem,
  RequiredRule,
  EmailRule,
  StringLengthRule,
} from "devextreme-react/form";
// firebase import
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

const SignUp = () => {
  // init state object for user signup form
  const initialState = {
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  // getting function to set current user from user context
  const { setCurrentUser } = useContext(UserContext);
  // declaring form state object with initial values
  const [data, setData] = useState(initialState);
  // declaring navigate for react router navigation
  const navigate = useNavigate();
  // declaring password form field options
  const passwordOptions = {
    mode: "password",
  };
  // defining form reset functionality for when form is submitted
  const resetFormFields = () => {
    setData(initialState);
  };
  // defining onchange event for devextreme form and updating form state object
  const handleChange = (e) => {
    const targetField = e.dataField;
    const targetValue = e.value;
    setData((prevState) => ({
      ...prevState,
      [targetField]: targetValue,
    }));
  };
  // defining form submit - if the password fields match then try to create a new user object in the 'users' firestore collection. If a user with the email does not exist, create one. If a user does exist alert that account already exists
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (data.password !== data.confirmPassword) {
      notify("password does not match", "warning", 5000);
      return;
    }

    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        data.email,
        data.password
      );

      await createUserDocumentFromAuth(user, { displayName: data.displayName });

      resetFormFields();
      setCurrentUser(user);
      navigate("/");
    } catch (error) {
      resetFormFields();

      if (error.code === "auth/email-already-in-use") {
        notify(
          {
            message: "Cannot Create: Username taken",
            width: 300,
            shading: false,
            position: "top center",
          },
          "error",
          3000
        );
      } else {
        console.log("user creation encountered an error", error);
      }
    }
  };
  return (
    <div className="form-header">
      <form onSubmit={handleSubmit}>
        <Form
          formData={data}
          showValidationSummary={true}
          onFieldDataChanged={handleChange}
        >
          <SimpleItem
            dataField="displayName"
            editorType="dxTextBox"
          >
            <RequiredRule message="Please enter a display name" />
          </SimpleItem>
          <SimpleItem
            dataField="email"
            editorType="dxTextBox"
          >
            <RequiredRule message="Please enter username" />
            <EmailRule message="Please enter vaild email" />
          </SimpleItem>
          <SimpleItem
            dataField="password"
            editorType="dxTextBox"
            editorOptions={passwordOptions}
          >
            <RequiredRule message="Please enter password" />
            <StringLengthRule
              min={8}
              message="Please enter a password of at least 8 characters"
            />
          </SimpleItem>
          <SimpleItem
            dataField="confirmPassword"
            editorType="dxTextBox"
            editorOptions={passwordOptions}
          >
            <RequiredRule message="Please enter password" />
            <StringLengthRule
              min={8}
              message="Please enter a password of at least 8 characters"
            />
          </SimpleItem>
          <ButtonItem>
            <ButtonOptions
              text={"Submit"}
              type={"default"}
              useSubmitBehavior={true}
            />
          </ButtonItem>
        </Form>
      </form>
    </div>
  );
};

export default SignUp;
