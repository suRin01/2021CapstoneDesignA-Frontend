import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

// components
import PostCardTitle from "./PostCardTitle";
import PostCardContent from "./PostCardContent";
import PostCardImages from "./PostCardImages";
import PostCardFooter from "./PostCardFooter";
import PostCardButtons from "./PostCardButtons";
import Comment from "../Comment/Comment";

// 사용자 정의 hooks
import useUser from "../../hooks/useUser";
import useButton from "../../hooks/useButton";

const PostCardStyle = styled.ul`
  width: 100%;
  padding: 2rem 0 0.5rem;
  margin-bottom: 3vh;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 0 10px gray;
`;

const PostCard = ({ post, onRemovePost, onAddCommentHome, onRemoveCommentHome, onToggleLike }) => {
  const [user] = useUser();
  const [isShowComment, onClickIsShowButton] = useButton(false);

  return (
    <PostCardStyle>
      {/* 게시글 최상단 ( 프로필이미지 ~ 옵션버튼 ) */}
      <PostCardTitle user={user} post={post} onRemovePost={onRemovePost}></PostCardTitle>

      {/* 게시글 컨텐츠 */}
      <PostCardContent content={post.content}></PostCardContent>

      {/* 게시글의 이미지 */}
      <PostCardImages Image={post.Image}></PostCardImages>

      {/* 게시글 하단 ( 좋아요 개수, 댓글 개수 ) */}
      <PostCardFooter Like={post.Like} Comment={post.Comment}></PostCardFooter>

      {/* 게시글 최하단 버튼들 ( 좋아요, 댓글, 공유 ) */}
      <hr />
      <PostCardButtons
        UserId={user?._id}
        PostId={post._id}
        onClickIsShowButton={onClickIsShowButton}
        onToggleLike={onToggleLike}
        Like={post.Like}
        isShowComment={isShowComment}
      ></PostCardButtons>

      {/* 댓글 영역 */}
      {isShowComment && (
        <>
          <hr />
          <Comment
            user={user}
            PostId={post._id}
            onAddCommentHome={onAddCommentHome}
            onRemoveCommentHome={onRemoveCommentHome}
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
  onAddCommentHome: PropTypes.func.isRequired,
  onRemoveCommentHome: PropTypes.func.isRequired,
  onToggleLike: PropTypes.func.isRequired,
};

export default PostCard;
