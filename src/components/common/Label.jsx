import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Container = styled.label`
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
`;

const Label = ({ children }) => {
  return <Container>{children}</Container>;
};

Label.propTypes = {
  children: PropTypes.string.isRequired,
};

export default Label;
