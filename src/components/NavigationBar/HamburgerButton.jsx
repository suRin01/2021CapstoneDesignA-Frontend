import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Container = styled.section`
  position: absolute;
  top: 0;
  right: 0;

  button {
    display: none;
    flex-direction: column;

    & > span {
      width: 3rem;
      border-bottom: 5px solid black;
      margin: 5px 0;
    }
  }
`;

const HamburgerButton = ({ onChangeShowLink }) => {
  return (
    <Container>
      <button type="button" onClick={onChangeShowLink}>
        <span></span>
        <span></span>
        <span></span>
      </button>
    </Container>
  );
};

HamburgerButton.propTypes = {
  onChangeShowLink: PropTypes.func.isRequired,
};

export default HamburgerButton;
