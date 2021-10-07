// Higher Order Component
// 아마 사용자 로그인 유무에 따른 페이지 접근에 대한 판단을 할 때 사용함
/**
 * option값
 * null : 누구나 접근 가능
 * true : 로그인한 사용자만 접근가능
 * false : 로그인안한 사용자만 접근가능
 */

import React, { useEffect } from "react";

const authHOC = (Component, option) => {
  return function ({ history: { push } }) {
    useEffect(() => {
      console.log("HOC호출, 로그인 유무 검사 후 페이지 이동");
      console.log("option >> ", option);
    }, []);

    // 로그인판단할 값 + option값을 이용해서 페이지이동을 결정
    // 이동은 push("/"); 형태로 사용

    return <Component></Component>;
  };
};

export default authHOC;
