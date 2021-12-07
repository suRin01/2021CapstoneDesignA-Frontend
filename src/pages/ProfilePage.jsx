import React, { useContext } from "react";
import { withRouter } from "react-router";
import styled from "styled-components";

import Profile from "../components/Profile/Profile";

// 사용자 정의 hook
import UserContext from "context/user";

const ProfilePageStyle = styled.section`
  width: 100%;
`;

const ProfilePage = () => {
  const { user } = useContext(UserContext);

  return (
    <>
      <ProfilePageStyle>
        <Profile user={user} />
      </ProfilePageStyle>
    </>
  );
};

export default withRouter(ProfilePage);
