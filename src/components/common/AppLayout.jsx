import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

// component
import NavigationBar from "./NavigationBar";

const MainLayoutStyle = styled.main`
  display: flex;
  justify-content: center;
  max-width: 680px;
  min-width: 540px;
  width: 40vw;
  margin: auto;
  margin-top: 4vh;
`;

const AppLayout = ({ children }) => {
  return (
    <>
      {/* 헤더영역 */}
      <header>
        <NavigationBar />
      </header>

      {/* 메인영역 */}
      <MainLayoutStyle>{children}</MainLayoutStyle>
    </>
  );
};

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;
