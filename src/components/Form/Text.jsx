import React from "react";
import styled from "styled-components";

const Container = styled.span`
  color: ${({ isValidate }) => (isValidate ? "#0f851a" : "#b3130b")};
  margin-bottom: 1.5rem;

  @media only screen and (max-width: 768px) {
    font-size: 0.8rem;
    margin-bottom: 1rem;
  }
`;

const Text = ({ children, isValidate }) => {
  return (
    <Container isValidate={isValidate}>
      {isValidate ? "O " : "X "}
      {children}
    </Container>
  );
};

export default Text;
