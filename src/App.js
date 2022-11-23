// react import
import { Fragment, useContext } from "react";
// styling imports
import "devextreme/dist/css/dx.common.css";
import "devextreme/dist/css/dx.light.css";
import "./App.css";
// component imports
import Content from "./Content";
import ProtectedContent from "./ProtectedContent";
import PublicNavBar from "./components/navbar/publicNavbar";
import PrivateNavBar from "./components/navbar/privateNavbar";
import { UserContext } from "./contexts/user.context";
function App() {
  const { currentUser } = useContext(UserContext);
  if (currentUser) {
    return (
      <Fragment>
        <PrivateNavBar />
        <ProtectedContent />
      </Fragment>
    );
  } else {
    return (
      <Fragment>
        <PublicNavBar />
        <Content />
      </Fragment>
    );
  }
}
export default App;
