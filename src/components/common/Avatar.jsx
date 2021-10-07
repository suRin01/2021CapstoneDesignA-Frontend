import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const AvatarStyle = styled.img`
  border-radius: 100%;
  margin-right: ${({ marginRight }) => marginRight}px;
`;

const Avatar = ({ src, alt, width, height, marginRight }) => {
  return <AvatarStyle src={src} alt={alt} width={width} height={height} marginRight={marginRight} />;
};

Avatar.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  marginRight: PropTypes.number,
};

Avatar.defaultProps = {
  alt: "기본 이미지",
  width: 100,
  height: 100,
  marginRight: 10,
};

export default Avatar;
