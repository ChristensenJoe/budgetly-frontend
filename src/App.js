import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { ThemeProvider } from "@material-ui/styles";
import {
  makeStyles
} from "@material-ui/core"

import { useState } from "react"

import { lightTheme } from "./Themes/Lightmode";
import Login from "./Pages/Login";
import UserRoutes from "./Pages/UserRoutes";

const useStyles = makeStyles({
  root: {
    backgroundColor: lightTheme.palette.secondary.dark,
    backgroundImage: 'url("https://www.transparenttextures.com/patterns/gradient-squares.png")',
    minHeight: '100vh',
    marginBottom: -20
  }
})

function App() {
  const classes = useStyles();
  const [user, setUser] = useState("");

  return (
    <ThemeProvider theme={lightTheme}>
      <Router>
        <div
          className={classes.root}
        >
          <Switch>
            <Route exact path="/login">
              <Login
                setUser={setUser}
              />
            </Route>
            <Route path="/:user">
              <UserRoutes
                userData={user}
                setUser={setUser}
              />
            </Route>
            <Route exact path="/">
              <h1>Starting Page</h1>
            </Route>
          </Switch>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
