// react imports
import React, { useCallback, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
// user context import
import { UserContext } from "../../contexts/user.context";
// google sign in button import
import GoogleButton from "react-google-button";
// devextreme imports
import notify from "devextreme/ui/notify";
import Form, {
  Item,
  ButtonItem,
  ButtonOptions,
  SimpleItem,
  RequiredRule,
  EmailRule,
} from "devextreme-react/form";
// firebase import
import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
  signInAuthUserWithEmailAndPassword,
} from "../../utils/firebase/firebase.utils";
// custom scss import
import "./LoginForm.scss";

export default function LoginForm() {
  // init state
  const initialState = {
    UserName: "",
    Password: "",
  };
  // init data for devextreme form
  const [data, setData] = useState(initialState);
  // declare navigate for react router
  const navigate = useNavigate();
  // declare functionality for reset button for devextreme form
  const resetFormFields = () => {
    setData(initialState);
  };
  // declare current user object from user context
  const { setCurrentUser } = useContext(UserContext);
  // declare google popup functionality - signs user in and sets user context to google account details. This also will create a user object in the firestore 'users' collection. Upon success, user will be navigated to home page.
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
  // handles submission of the devextreme for. this is for manual user creation based upon the form entry
  const handleSubmit = async (event) => {
    event.preventDefault();
    // if an email doesn't exist in the 'users' collection table, allow the creation of a user with data that has been entered in the form. Navigate to home page. Otherwise handle errors
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
          notify(
            {
              message: "Incorrect username or password",
              width: 300,
              shading: false,
              position: "top center",
            },
            "error",
            3000
          );
          break;
        case "auth/user-not-found":
          resetFormFields();
          notify(
            {
              message: "User not found",
              width: 300,
              shading: false,
              position: "top center",
            },
            "error",
            3000
          );
          break;
        default:
          console.log(error);
      }
    }
  };
  // handling event changes in the devextreme form and storing them to appropriate data object
  const handleChange = (e) => {
    const targetField = e.dataField;
    const targetValue = e.value;
    setData((prevState) => ({
      ...prevState,
      [targetField]: targetValue,
    }));
  };
  // link functionality for the create account button
  const onCreateAccountClick = useCallback(() => {
    navigate("/signup");
  }, [navigate]);
  // define submit button for devextreme form
  const buttonOptions = {
    width: "100%",
    text: "Sign In",
    type: "default",
    useSubmitBehavior: true,
    onClick: function () {
      handleSubmit();
    },
  };
  // define password field in devextreme form
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
          <Item>
            <div>
              <Link to={"/reset-password"}>Forgot password?</Link>
            </div>
          </Item>
        </Form>
      </form>
      <form
        className="space"
        onSubmit={logGoogleUser}
      >
        <Form>
          <Item>
            <div>
              <GoogleButton
                type="dark" // can be light or dark
                onClick={() => {
                  logGoogleUser();
                }}
              />
            </div>
          </Item>
          <ButtonItem>
            <ButtonOptions
              text={"Create Account"}
              width={"100%"}
              onClick={onCreateAccountClick}
            />
          </ButtonItem>
        </Form>
      </form>
    </div>
  );
}
