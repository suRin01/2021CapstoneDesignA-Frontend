import React, { useMemo } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const Container = styled.section`
  display: inline-flex;
  justify-content: center;
  align-items: center;

  & > li {
    display: inline-block;
  }
  & > li > a {
    display: inline-block;
    padding: 1.5rem 2.5rem;
    border-radius: 5px;
    text-align: center;
  }
  & > li > a:hover {
    background-color: #e0e0e0;
  }
`;

const NavCenter = () => {
  const activeLinkStyle = useMemo(() => ({ color: "#1977f1" }), []);

  return (
    <Container>
      <li>
        <NavLink to="/" activeStyle={activeLinkStyle} exact>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/friend" activeStyle={activeLinkStyle}>
          Friend
        </NavLink>
      </li>
    </Container>
  );
};

export default NavCenter;
