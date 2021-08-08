import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import "./App.css";
import { AuthProvider } from "contexts/auth";
import { useAuth } from "contexts/auth";
import SnackbarProvider from "react-simple-snackbar";

import Playground from "./components/playground/";
import Auth from "components/auth";
import Home from "components/home";

function App() {
  return (
    <SnackbarProvider>
      <AuthProvider>
        <div className="App">
          <Switch>
            <Route path="/auth" component={Auth} />
            <PrivateRoute exact path="/play/:matchId" component={Playground} />
            <PrivateRoute path="/" component={Home} />
          </Switch>
        </div>
      </AuthProvider>
    </SnackbarProvider>
  );
}

function PrivateRoute({ path, component: Component, ...rest }) {
  const { currentUser } = useAuth();
  if (!currentUser) {
    if (path.includes("/play/")) {
      sessionStorage.setItem(
        "link-matchId",
        window.location.pathname.split("/")[2]
      );
    }
  }
  return (
    <Route
      {...rest}
      render={(props) => {
        return currentUser ? <Component {...props} /> : <Redirect to="/auth" />;
      }}
    ></Route>
  );
}

export default App;
