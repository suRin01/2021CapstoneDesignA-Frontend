import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const ButtonsStyle = styled.li`
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

const PostCardButtons = ({ onClickIsShowButton }) => {
  return (
    <ButtonsStyle>
      <button type="button">좋아요</button>
      <button type="button" onClick={onClickIsShowButton}>
        댓글달기
      </button>
      <button type="button">공유하기</button>
    </ButtonsStyle>
  );
};

PostCardButtons.propTypes = {
  onClickIsShowButton: PropTypes.func.isRequired,
};

export default PostCardButtons;
