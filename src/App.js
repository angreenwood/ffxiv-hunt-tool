// react import
import { Fragment } from "react";
// styling imports
import "devextreme/dist/css/dx.common.css";
import "devextreme/dist/css/dx.light.css";
import "./App.css";
// component imports
import Content from "./Content";
import NavBar from "./components/navbar";
function App() {
  return (
    <Fragment>
      <NavBar />
      <Content />
    </Fragment>
  );
}
export default App;
