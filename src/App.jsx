import React, { useEffect, useState } from "react";
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

//
// import { apiLoadToMe } from "./api";

function App() {
  const [user, setUser] = useState(null);

  useEffect(async () => {
    // setUser(await apiLoadToMe());

    // 임시 로그인한 유저 대체
    // setUser({ _id: 1, name: "테스트" });

    // 임시 로그인안한 유저 대체
    setUser(false);
  }, []);

  if (user === null) return <div>유저정보 받는동안 잠시 대기 - 스피너로 교체할 생각</div>;

  return (
    <BrowserRouter>
      <AppLayout>
        <Switch>
          <Route path="/" component={authHOC(HomePage, null, user)} exact />
          <Route path="/register" component={authHOC(RegisterPage, false, user)} exact />
          <Route path="/login" component={authHOC(LoginPage, false, user)} exact />
          <Route path="/friend" component={authHOC(FriendPage, true, user)} exact />
        </Switch>
      </AppLayout>
    </BrowserRouter>
  );
}

export default App;
