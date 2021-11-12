import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.section`
  /* 임시 */
  font-weight: bold;
  font-size: 2rem;
`;

const NavLeft = () => {
  return (
    <Container>
      <li>
        <Link to="/">LOGO</Link>
      </li>
    </Container>
  );
};

export default NavLeft;
