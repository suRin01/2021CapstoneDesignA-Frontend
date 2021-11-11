import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import useUser from "../../../hooks/useUser";
import useButton from "../../../hooks/useButton";

// components
import PostCardTitle from "./PostCardTitle";
import PostCardContent from "./PostCardContent";
import PostCardImages from "./PostCardImages";
import PostCardFooter from "./PostCardFooter";
import PostCardButtons from "./PostCardButtons";
import Comment from "../Comment/Comment";

const PostCardStyle = styled.ul`
  width: 100%;
  padding: 2rem 0 0.5rem;
  margin-bottom: 3vh;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 0 10px gray;
`;

const PostCard = ({ post, onRemovePost, onAppendComment, onRemoveCommentTemp, onToggleLike }) => {
  const [user] = useUser();
  const [isShowComment, onClickIsShowButton] = useButton(false);

  return (
    <PostCardStyle>
      <PostCardTitle user={user} post={post} onRemovePost={onRemovePost}></PostCardTitle>
      <PostCardContent content={post.content}></PostCardContent>
      <PostCardImages Image={post.Image}></PostCardImages>
      <PostCardFooter Like={post.Like} Comment={post.Comment}></PostCardFooter>
      <hr />
      <PostCardButtons
        UserId={user._id}
        PostId={post._id}
        onClickIsShowButton={onClickIsShowButton}
        onToggleLike={onToggleLike}
        Like={post.Like}
      ></PostCardButtons>
      {isShowComment && (
        <>
          <hr />
          <Comment
            user={user}
            PostId={post._id}
            onAppendComment={onAppendComment}
            onRemoveCommentTemp={onRemoveCommentTemp}
          />
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
  }).isRequired,
  onRemovePost: PropTypes.func.isRequired,
  onAppendComment: PropTypes.func.isRequired,
  onRemoveCommentTemp: PropTypes.func.isRequired,
  onToggleLike: PropTypes.func.isRequired,
};

export default PostCard;
