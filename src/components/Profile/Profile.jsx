import React, { useState } from "react";
import styled from "styled-components";
import { withRouter, Link } from "react-router-dom";
import PropTypes from "prop-types";

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
  justify-content: space-between;
`;

const BtnStyle = styled.button`
  background-color: #9ddcce;
  height: 2rem;
  font-size: 1rem;
  border-radius: 3px;

  &:hover {
    transition: all 0s;
    background-color: #80c2b3;
  }
`;

const Profile = ({ post, user, history }) => {
  const isMine = true;

  console.log(post);
  return (
    <>
      <ProfileStyle>
        <Avatar
          src={user.Image.path}
          alt="프로필이미지"
          width={130}
          height={130}
          marginRight={0}
          style={{ border: "3px solid #80c2b3" }}
        />
        <ProfileText userData={user} />
        {isMine ? (
          <BtnStyle onClick={() => history.push(`/modify/${user?._id}`)}>편집</BtnStyle>
        ) : (
          <BtnStyle>추가</BtnStyle>
        )}
      </ProfileStyle>
    </>
  );
};

export default withRouter(Profile);
