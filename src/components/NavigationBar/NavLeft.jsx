import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import logoImg from "./jbIcon.svg";
const Container = styled.section`
  display: inline-flex;
  justify-content: center;
  align-items: center;
`;

const NavLeft = () => {
  return (
    <Container>
      <li>
        <Link to="/">
          <img src={logoImg} alt="logoimg" height="65"></img>
        </Link>
      </li>
    </Container>
  );
};

export default NavLeft;
