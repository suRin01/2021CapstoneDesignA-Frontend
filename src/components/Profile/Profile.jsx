import React, { useState } from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import ProfileText from "./ProfileText";
// components
import Avatar from "../common/Avatar";

const ProfileStyle = styled.div`
  width: 100%;
  padding: 2rem;
  margin-bottom: 3vh;
  background-color: #ffffff;
  border-radius: 10px;
  display: flex;
`;

const BtnStyle = styled.button`
  background-color: #9ddcce;
  height: 2rem;
  font-size: 1rem;
  border-radius: 3px;
  white-space: nowrap;

  &:hover {
    transition: all 0s;
    background-color: #80c2b3;
  }
`;
function friends() {
  console.log("친구추가 기능 수행(추가/요청/수락/삭제)");
}

const Profile = ({ user, match, history }) => {
  console.log(`UserId : ${match.params.UserId} / 현재 요청한 아이디 확인`);
  const isMine = match.params.UserId == user?._id;

  return (
    <>
      <ProfileStyle>
        <Avatar
          src={user.Image.path}
          alt="프로필이미지"
          width={130}
          height={130}
          marginRight={35}
          style={{ border: "3px solid #80c2b3" }}
        />
        <ProfileText userData={user} />
        {isMine ? (
          <BtnStyle onClick={() => history.push(`/modify/${user?._id}`)}>편집</BtnStyle>
        ) : (
          <BtnStyle onClick={() => friends()}>추가</BtnStyle>
        )}
      </ProfileStyle>
    </>
  );
};

export default withRouter(Profile);
