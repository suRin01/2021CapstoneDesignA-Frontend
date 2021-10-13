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
    setUser({ _id: 1, name: "테스트" });

    // 임시 로그인안한 유저 대체
    // setUser(false);

    // 상태관리자로 localStorage사용
    localStorage.setItem(
      "user",
      JSON.stringify({
        _id: 1,
        name: "테스트",
        Image: {
          path: "https://search.pstatic.net/common?type=n&size=174x174&quality=95&direct=true&src=https%3A%2F%2Fmusicmeta-phinf.pstatic.net%2Falbum%2F003%2F192%2F3192546.jpg%3Ftype%3Dr204Fll%26v%3D20210529225516",
        },
      }),
    );
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
