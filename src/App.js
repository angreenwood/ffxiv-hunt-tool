import { Fragment } from 'react';
import "devextreme/dist/css/dx.common.css";
import "devextreme/dist/css/dx.light.css";
import "./App.css";
import Content from "./Content";
import NavBar from "./components/navbar";
import { UserAuth } from './contexts/user.context';
function App() {
  const {user} = UserAuth();
  return(
<Fragment>
  <NavBar user={user}/>
  <Content user={user}/>
        </Fragment>
  )

}
export default App;
