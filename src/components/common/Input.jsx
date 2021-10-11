import React from "react";
import styled from "styled-components";

const Container = styled.input`
  width: 600px;
  height: 60px;
  padding: 0.4rem 1rem;
  font-size: 1.5rem;
  border-radius: 4px;

  &:focus {
    --saf-0: rgba(var(--sk_highlight, 18, 100, 163), 1);
    box-shadow: 0 0 0 1px var(--saf-0), 0 0 0 5px rgba(29, 155, 209, 0.3);
  }
  &::placeholder {
    color: #ccc;
    font-size: 1rem;
  }

  @media only screen and (max-width: 768px) {
    width: 400px;
    height: 40px;
    font-size: 1rem;
    border-radius: 3px;
    padding: 0.4rem 0.6rem;

    &::placeholder {
      font-size: 0.8rem;
    }
  }
`;

const Input = props => {
  return <Container {...props} />;
};

export default Input;
