import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Container = styled.form`
  display: flex;
  flex-direction: column;
`;

const Form = ({ children, onSubmit }) => {
  return <Container onSubmit={onSubmit}>{children}</Container>;
};

Form.propTypes = {
  children: PropTypes.node.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default Form;
