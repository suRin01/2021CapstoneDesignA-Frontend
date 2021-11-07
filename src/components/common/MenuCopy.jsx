import React from "react";
import styled from "styled-components";

const Wrapper = styled.section`
  position: relative;

  .menu {
    position: absolute;
    top: 50px;
    left: 15px;
    padding: 0.3rem;
    border-radius: 10px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.4);
    background: #ffffff;
    transform: translateX(-50%);
    z-index: 1;

    button[type="button"] {
      white-space: nowrap;
      padding: 0.3rem 5rem;

      &:hover {
        background: rgba(0, 0, 0, 0.1);
        border-radius: 5px;
      }
    }
  }
`;

const MenuCopy = ({ children }) => {
  return (
    <Wrapper>
      <div className="menu">{children}</div>
    </Wrapper>
  );
};

export default MenuCopy;
