import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import logoImg from "logo.png";

const Container = styled.section`
  /* 임시 */
  font-weight: bold;
  font-size: 2rem;

  img {
    width: 4rem;
    align-items: center;
  }
`;

const NavLeft = () => {
  return (
    <Container>
      <li>
        <Link to="/">
          <img src={logoImg} />
        </Link>
      </li>
    </Container>
  );
};

export default NavLeft;
