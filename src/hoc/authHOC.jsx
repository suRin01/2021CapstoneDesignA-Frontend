// Higher Order Component
// 아마 사용자 로그인 유무에 따른 페이지 접근에 대한 판단을 할 때 사용함
/**
 * option값
 * null : 누구나 접근 가능
 * true : 로그인한 사용자만 접근가능
 * false : 로그인안한 사용자만 접근가능
 */

import UserContext from "context/user";
import React, { useContext } from "react";

const authHOC = (Component, option) => {
  return function ({ history: { push } }) {
    const { user } = useContext(UserContext);

    // 누구나 접근가능
    if (option === null) return <Component />;

    // 로그인한유저가 로그인해야하는 페이지 접근
    if (option === true && user) return <Component />;

    // 로그인 안한유저가 로그인 안해야하는 페이지 접근
    if (option === false && !user) return <Component />;

    // 그 이외의 불법적인 접근들일 경우 메인페이지로 강제이동
    push("/");
    return <Component />;
  };
};

export default authHOC;
