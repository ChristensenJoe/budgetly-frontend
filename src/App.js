import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { ThemeProvider } from "@material-ui/styles";

import {lightTheme}  from "./Themes/Lightmode";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import NavBar from "./Components/NavBar/NavBar.js";

function App() {
  return (
    <ThemeProvider theme={lightTheme}>
      <Router>
        <Switch>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route path="/:user">
            <NavBar />
            <Dashboard />
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
