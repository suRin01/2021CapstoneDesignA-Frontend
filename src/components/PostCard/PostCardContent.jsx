import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const ContentStyle = styled.li`
  padding: 1rem 2rem;
`;

const PostCardContent = ({ content }) => {
  return (
    <ContentStyle>
      <pre>{content}</pre>
    </ContentStyle>
  );
};

PostCardContent.propTypes = {
  content: PropTypes.string.isRequired,
};

export default PostCardContent;
