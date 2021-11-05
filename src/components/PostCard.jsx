import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import useButton from "../hooks/useButton";

// components
import PostCardTitle from "./PostCardTitle";
import PostCardContent from "./PostCardContent";
import PostCardImages from "./PostCardImages";
import PostCardFooter from "./PostCardFooter";
import PostCardButtons from "./PostCardButtons";
import Comment from "./common/Comment/Comment";

const PostCardStyle = styled.ul`
  width: 100%;
  padding: 2rem 0 0.5rem;
  margin-bottom: 3vh;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 0 10px gray;
`;

const PostCard = ({ post }) => {
  const [isShowComment, onClickIsShowButton] = useButton(false);

  return (
    <PostCardStyle>
      <PostCardTitle post={post}></PostCardTitle>
      <PostCardContent content={post.content}></PostCardContent>
      <PostCardImages Image={post.Image}></PostCardImages>
      <PostCardFooter Like={post.Like} Comment={post.Comment}></PostCardFooter>
      <hr />
      <PostCardButtons onClickIsShowButton={onClickIsShowButton}></PostCardButtons>
      {isShowComment && (
        <>
          <hr />
          <Comment PostId={post._id} />
        </>
      )}
    </PostCardStyle>
  );
};

PostCard.propTypes = {
  post: PropTypes.shape({
    _id: PropTypes.number.isRequired,
    content: PropTypes.string.isRequired,
    updatedAt: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.number]).isRequired,
    User: PropTypes.shape({
      name: PropTypes.string.isRequired,
      Image: PropTypes.shape({
        path: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
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
    Image: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.number.isRequired,
        path: PropTypes.string.isRequired,
      }).isRequired,
    ).isRequired,
  }),
};

export default PostCard;
