import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Container = styled.button`
  align-self: center;
  width: 40%;
  height: 60px;
  background: #176fe5;
  border-radius: 10px;
  color: #ffffff;
  font-size: 1.4rem;

  &:hover {
    background-color: #0c59b8;
  }
`;

const Button = ({ children, style, type }) => {
  return (
    <Container type={type} style={style}>
      <b>{children}</b>
    </Container>
  );
};

Button.propTypes = {
  children: PropTypes.string.isRequired,
  style: PropTypes.object,
  type: PropTypes.string.isRequired,
};

export default Button;
