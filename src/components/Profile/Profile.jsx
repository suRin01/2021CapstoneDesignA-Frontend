import React from "react";
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

const Profile = ({ post, user, uID, history }) => {
  return (
    <>
      <ProfileStyle>
        <Avatar
          src="https://search.pstatic.net/common?type=n&size=174x174&quality=95&direct=true&src=https%3A%2F%2Fmusicmeta-phinf.pstatic.net%2Falbum%2F003%2F192%2F3192546.jpg%3Ftype%3Dr204Fll%26v%3D20210529225516"
          alt="프로필이미지"
          width={130}
          height={130}
          marginRight={0}
        />
        <ProfileText uID={user} />
        <BtnStyle onClick={() => history.push(`/modify/${user}`)}>편집</BtnStyle>
      </ProfileStyle>
    </>
  );
};

Profile.propTypes = {
  post: PropTypes.shape({
    _id: PropTypes.number.isRequired,
    content: PropTypes.string.isRequired,
    updatedAt: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.number]).isRequired,
    User: PropTypes.shape({
      name: PropTypes.string.isRequired,
      Image: PropTypes.shape({
        path: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
};

export default withRouter(Profile);
