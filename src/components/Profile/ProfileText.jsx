import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const TextStyle = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;
const UserID = styled.label`
  font-size: 1.7rem;
  font-weight: bold;
  margin-bottom: 0.7rem;
`;
const UserData = styled.ul`
  font-size: 1.3rem;
  width: 17vw;
  margin-bottom: 0.5rem;
  display: felx;
  font-weight: bold;
  gap: 4.5vw;
`;
const Introduction = styled.div`
  font-size: 1rem;
  border: none;
  resize: none;
  margin-top: 5px;
  padding-right: 5px;
  color: grey;
  white-space: normal;
`;

const ProfileText = ({ userData, postNum, friendNum, introduction }) => {
  return (
    <>
      <TextStyle>
        <UserID>{userData.name}</UserID>
        <UserData>
          <li>게시물 &nbsp; {postNum}</li>
          <li>친구 &nbsp; {friendNum}</li>
        </UserData>
        <Introduction>{introduction}</Introduction>
      </TextStyle>
    </>
  );
};

ProfileText.defaultProps = {
  userID: "userID",
  postNum: 0,
  friendNum: 0,
  introduction: "",
};
ProfileText.propTypes = {
  userID: PropTypes.string,
  postNum: PropTypes.number,
  friendNum: PropTypes.number,
  Introduction: PropTypes.string,
};
export default ProfileText;
