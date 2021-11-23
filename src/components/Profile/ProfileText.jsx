import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const TextStyle = styled.div`
  display: flex;
  flex-direction: column;
`;
const UserID = styled.label`
  font-size: 1.7rem;
  font-weight: bold;
  margin-bottom: 0.7rem;
`;
const UserData = styled.ul`
  font-size: 1.3rem;
  font-weight: bold;
  width: 17vw;
  margin-bottom: 0.5rem;
  display: felx;
  gap: 20px;
`;
const UserData2 = styled.div`
  font-size: 1rem;
  border: none;
  resize: none;
  width: 18vw;
  margin-top: 5px;
`;

const ProfileText = ({ userData, postNum, friendNum, Introduction }) => {
  return (
    <>
      <TextStyle>
        <UserID>{userData.name}</UserID>
        <UserData>
          <li>게시물 {postNum}</li>
          <li>친구 {friendNum}</li>
        </UserData>
        <UserData2>{Introduction}</UserData2>
      </TextStyle>
    </>
  );
};

ProfileText.defaultProps = {
  uID: "testUser",
  postNum: 0,
  friendNum: 0,
  Introduction: "소개글",
};
ProfileText.propTypes = {
  uID: PropTypes.string,
  postNum: PropTypes.number,
  friendNum: PropTypes.number,
  Introduction: PropTypes.string,
};
export default ProfileText;
