import React, { useEffect } from "react";
import { withRouter } from "react-router";

const ProfilePage = ({ match }) => {
  useEffect(() => {
    console.log(`UserId : ${match.params.UserId}를 이용해서 서버에다가 정보요청`);
    // 단, 로그인한유저와 현재 페이지에서 요청하는 유저의 아이디값이 일치한다면, 따로 요청하지 않고 현재 localStorage에 있는 데이터 이용하고 특정 기능들 추가로 부여
  });

  return (
    <>
      <h1>ProfilePage - {match.params.UserId}</h1>
    </>
  );
};

export default withRouter(ProfilePage);
