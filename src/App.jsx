import React, { useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

// global-css
import "./css/reset.css";
import "./css/common.css";

// pages
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import FriendPage from "./pages/FriendPage";
import ProfilePage from "./pages/ProfilePage";
import WritePostPage from "./pages/WritePostPage";

// 해당 페이지의 기본 레이아웃
import AppLayout from "./AppLayout";

// HOC
import authHOC from "./hoc/authHOC";

// api
// import { apiLoadToMe } from "./api";

function App() {
  useEffect(async () => {
    // setUser(await apiLoadToMe());
  }, []);

  return (
    <BrowserRouter>
      <AppLayout>
        <Switch>
          <Route path="/" component={authHOC(HomePage, null)} exact />
          <Route path="/register" component={authHOC(RegisterPage, false)} exact />
          <Route path="/login" component={authHOC(LoginPage, false)} exact />
          <Route path="/friend" component={authHOC(FriendPage, true)} exact />
          <Route path="/profile/:UserId" component={authHOC(ProfilePage, true)} exact />
          <Route path="/write" component={authHOC(WritePostPage, true)} exact />
          <Route path="/write/:PostId" component={authHOC(WritePostPage, true)} exact />
        </Switch>
      </AppLayout>
    </BrowserRouter>
  );
}

export default App;
