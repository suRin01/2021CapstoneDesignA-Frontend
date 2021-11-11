import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import useButton from "../../../hooks/useButton";

const ButtonWrapper = styled.li`
  display: flex;
  justify-content: space-around;
  padding: 0 2rem;

  & > button {
    flex-grow: 1;
    padding: 1rem 0rem;
    border-radius: 5px;
    font-weight: bold;
    color: #666;
  }
  & > button:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

const PostCardButtons = ({ UserId, PostId, onClickIsShowButton, onToggleLike, Like }) => {
  const [isLike, onClickIsLike] = useButton(Like.some(like => like._id === UserId));

  return (
    <ButtonWrapper>
      <button
        type="button"
        onClick={() => {
          onToggleLike(PostId);
          onClickIsLike();
        }}
      >
        {isLike ? "좋아요 취소" : "좋아요"}
      </button>
      <button type="button" onClick={onClickIsShowButton}>
        댓글달기
      </button>
      <button type="button">공유하기</button>
    </ButtonWrapper>
  );
};

PostCardButtons.propTypes = {
  UserId: PropTypes.number.isRequired,
  PostId: PropTypes.number.isRequired,
  onClickIsShowButton: PropTypes.func.isRequired,
  onToggleLike: PropTypes.func.isRequired,
  Like: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
};

export default PostCardButtons;
