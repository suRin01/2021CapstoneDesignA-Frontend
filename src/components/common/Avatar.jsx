import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const AvatarStyle = styled.img`
  border-radius: 100%;
  margin-right: ${({ marginRight }) => marginRight}px;
`;

const Avatar = props => {
  return <AvatarStyle {...props} />;
};

Avatar.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  marginRight: PropTypes.number,
};

Avatar.defaultProps = {
  src: "https://docs.openstack.org/glance/latest/_images/glance_db.png",
  alt: "기본 이미지",
  width: 100,
  height: 100,
  marginRight: 10,
};

export default Avatar;
