import React, { useCallback, useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

// component
import Icon from "../common/Icon";

const ButtonWrapper = styled.li`
  display: flex;
  justify-content: space-around;
  padding: 0 2rem;

  & > button {
    display: flex;
    justify-content: center;
    align-items: center;
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
const ButtonText = styled.span`
  color: ${({ color }) => color};
`;

const PostCardButtons = ({
  UserId,
  PostId,
  onClickIsShowButton,
  onToggleLike,
  Like,
  isShowComment,
}) => {
  // 본인이 좋아요를 이미 눌렀는지 아닌지 판단해서 초기값으로 넘겨줌
  const [isLike, setIsLike] = useState(Like.some(like => like._id === UserId));

  const onClickIsLike = useCallback(() => {
    if (!UserId) return;

    setIsLike(prev => !prev);
  }, [UserId]);

  return (
    <ButtonWrapper>
      <button
        type="button"
        onClick={() => {
          onToggleLike(PostId);
          onClickIsLike();
        }}
      >
        {isLike ? (
          <>
            <Icon shape="fillHeart" />
            <ButtonText color="red">좋아요</ButtonText>
          </>
        ) : (
          <>
            <Icon shape="heart" />
            <ButtonText>좋아요</ButtonText>
          </>
        )}
      </button>
      <button type="button" onClick={onClickIsShowButton}>
        {isShowComment ? (
          <>
            <Icon shape="fillComment" />
            <ButtonText color="green">댓글달기</ButtonText>
          </>
        ) : (
          <>
            <Icon shape="comment" />
            <ButtonText>댓글달기</ButtonText>
          </>
        )}
      </button>
      <button type="button">
        <Icon shape="export" />
        <span>공유하기</span>
      </button>
    </ButtonWrapper>
  );
};

PostCardButtons.propTypes = {
  UserId: PropTypes.oneOfType([PropTypes.number]),
  PostId: PropTypes.number.isRequired,
  onClickIsShowButton: PropTypes.func.isRequired,
  onToggleLike: PropTypes.func.isRequired,
  Like: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  isShowComment: PropTypes.bool.isRequired,
};

export default PostCardButtons;
