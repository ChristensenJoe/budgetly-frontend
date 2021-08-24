import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { ThemeProvider } from "@material-ui/styles";
import {useState} from "react"

import {lightTheme}  from "./Themes/Lightmode";
import Login from "./Pages/Login";
import UserRoutes from "./Pages/UserRoutes";
import NavBar from "./Components/NavBar/NavBar.js";


function App() {

  const [user, setUser] = useState(null);

  return (
    <ThemeProvider theme={lightTheme}>
      <Router>
        <Switch>
          <Route exact path="/login">
            <Login 
              setUser={setUser}
            />
          </Route>
          <Route path="/:user">
            <NavBar 
              userData={user}
            />
            <UserRoutes 
              userData={user}
              setUser={setUser}
            />
          </Route>
          <Route exact path="/">
            <h1>Starting Page</h1>
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
