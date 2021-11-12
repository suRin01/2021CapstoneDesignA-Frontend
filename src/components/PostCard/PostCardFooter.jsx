import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const FooterStyle = styled.li`
  display: flex;
  justify-content: space-between;
  padding: 1rem 2rem;
`;

const PostCardFooter = ({ Like, Comment }) => {
  return (
    <FooterStyle>
      <span>좋아요 {Like.length}개</span>
      <span>댓글 {Comment.length}개</span>
    </FooterStyle>
  );
};

PostCardFooter.propTypes = {
  Like: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  Comment: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.number.isRequired,
    }).isRequired,
  ).isRequired,
};

export default PostCardFooter;
