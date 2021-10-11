import React from "react";
import styled from "styled-components";

const Container = styled.form`
  display: flex;
  flex-direction: column;
`;

const Form = ({ children, onSubmit }) => {
  return <Container onSubmit={onSubmit}>{children}</Container>;
};

export default Form;
