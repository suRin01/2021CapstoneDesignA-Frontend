import React from "react";
import styled from "styled-components";
import { withRouter } from "react-router";
import UserData from "../components/Modify/UserData";

const ModifyStyle = styled.section`
  width: 100%;
  background-color: #ffffff;
  border-radius: 5px;
  padding: 1rem;
  margin-bottom: 3vh;
`;

const ModifyPage = ({ match, history }) => {
  return (
    <>
      <ModifyStyle>
        <UserData user={match.params.UserId}></UserData>
      </ModifyStyle>
    </>
  );
};

export default withRouter(ModifyPage);
