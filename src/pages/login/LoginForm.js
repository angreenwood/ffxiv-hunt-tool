import React, { useCallback, useState, useContext } from "react";
import { UserContext } from "../../contexts/user.context";
import { Link, useNavigate } from "react-router-dom";
import notify from "devextreme/ui/notify";
import Form, {
  Item,
  ButtonItem,
  ButtonOptions,
  SimpleItem,
  RequiredRule,
  EmailRule,
} from "devextreme-react/form";
import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
  signInAuthUserWithEmailAndPassword,
} from "../../utils/firebase/firebase.utils";

import "./LoginForm.scss";

export default function LoginForm() {
  const initialState = {
    UserName: "",
    Password: "",
  };
  const [data, setData] = useState(initialState);
  const navigate = useNavigate();
  const resetFormFields = () => {
    setData(initialState);
  };

  const { setCurrentUser } = useContext(UserContext);

  const logGoogleUser = async () => {
    try {
      const { user } = await signInWithGooglePopup();
      const userDocRef = await createUserDocumentFromAuth(user);
      setCurrentUser(user);
      navigate("/");
    } catch (error) {
      notify(error, "warning", 5000);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const { user } = await signInAuthUserWithEmailAndPassword(
        data.UserName,
        data.Password
      );
      resetFormFields();
      setCurrentUser(user);
      navigate("/");
    } catch (error) {
      switch (error.code) {
        case "auth/wrong-password":
          resetFormFields();
          notify("Incorrect Username or Password", "warning", 5000);
          break;
        case "auth/user-not-found":
          resetFormFields();
          notify("User not found", "warning", 5000);
          break;
        default:
          console.log(error);
      }
    }
  };

  const handleChange = (e) => {
    const targetField = e.dataField;
    const targetValue = e.value;
    setData((prevState) => ({
      ...prevState,
      [targetField]: targetValue,
    }));
  };

  const onCreateAccountClick = useCallback(() => {
    navigate("/create-account");
  }, [navigate]);

  const googleButtonOptions = {
    onClick: logGoogleUser,
    text: "Google Sign In",
    width: "100%",
    type: "default",
  };

  const buttonOptions = {
    width: "100%",
    text: "Sign In",
    type: "success",
    useSubmitBehavior: true,
    onClick: function () {
      handleSubmit();
    },
  };

  const passwordOptions = {
    mode: "password",
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
            dataField="UserName"
            editorType="dxTextBox"
          >
            <RequiredRule message="Please enter username" />
            <EmailRule message="Please enter vaild email" />
          </SimpleItem>
          <SimpleItem
            dataField="Password"
            editorType="dxTextBox"
            editorOptions={passwordOptions}
          >
            <RequiredRule message="Please enter password" />
          </SimpleItem>
          <ButtonItem
            horizontalAlignment="right"
            buttonOptions={buttonOptions}
          />
        </Form>
      </form>
      <form
        className="space"
        onSubmit={logGoogleUser}
      >
        <Form>
          <Item
            itemType="button"
            buttonOptions={googleButtonOptions}
          />
          <Item>
            <div className={"link"}>
              <Link to={"/reset-password"}>Forgot password?</Link>
            </div>
          </Item>
          <ButtonItem>
            <ButtonOptions
              text={"Create an account"}
              width={"100%"}
              onClick={onCreateAccountClick}
            />
          </ButtonItem>
        </Form>
      </form>
    </div>
  );
}
