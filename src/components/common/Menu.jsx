import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const CreateMenu = styled.section`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: 1000;
`;
const Container = styled.ul`
  position: absolute;
  top: 90px;
  right: 10px;

  border: 1px solid gray;
  border-radius: 6px;
  box-shadow: 0 0 10px gray;
  padding: 1rem;
  background: #ffffff;

  & > li {
    display: flex;
    align-items: center;
    padding: 1rem 1.5rem;
    border-radius: 5px;
    cursor: pointer;

    & > span {
      display: flex;
      flex-direction: column;

      & > span {
        color: gray;
      }
    }
  }

  & > li:hover {
    background-color: #e0e0e0;
  }
`;

const Menu = ({ children, onCloseMenu }) => {
  return (
    <CreateMenu onClick={onCloseMenu}>
      <Container>
        {/* onClick={e => e.stopPropagation()} */}
        {children}
      </Container>
    </CreateMenu>
  );
};

Menu.propTypes = {
  children: PropTypes.node.isRequired,
  onCloseMenu: PropTypes.func.isRequired,
};

export default Menu;
