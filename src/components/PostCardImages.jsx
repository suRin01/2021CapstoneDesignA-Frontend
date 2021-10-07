import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const ImageContainerStyle = styled.li`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(45%, auto));
  grid-auto-rows: auto;
  grid-gap: 3px;

  & > img:nth-child(n + 5) {
    display: none;
  }
`;
const ImageStyle = styled.img`
  width: 100%;
`;

const PostCardImages = ({ Image }) => {
  return (
    <ImageContainerStyle>
      {Image.map(image => (
        <ImageStyle key={image._id} src={image.path} alt="임시" />
      ))}
    </ImageContainerStyle>
  );
};

PostCardImages.propTypes = {
  Image: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.number.isRequired,
      path: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
};

export default PostCardImages;
