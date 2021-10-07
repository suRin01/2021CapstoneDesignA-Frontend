import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

// global-css
import "./css/reset.css";
import "./css/common.css";

// pages
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import FriendPage from "./pages/FriendPage";

// common-components
import AppLayout from "./components/common/AppLayout";

// HOC
import authHOC from "./hoc/authHOC";

function App() {
  return (
    <BrowserRouter>
      <AppLayout>
        <Switch>
          <Route path="/" component={authHOC(HomePage, null)} exact />
          <Route path="/register" component={authHOC(RegisterPage, false)} exact />
          <Route path="/login" component={authHOC(LoginPage, false)} exact />
          <Route path="/friend" component={authHOC(FriendPage, false)} exact />
        </Switch>
      </AppLayout>
    </BrowserRouter>
  );
}

export default App;
