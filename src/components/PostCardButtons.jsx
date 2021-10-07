import React from "react";
import styled from "styled-components";

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

const PostCardButtons = () => {
  return (
    <ButtonsStyle>
      <button type="button">좋아요</button>
      <button type="button">댓글달기</button>
      <button type="button">공유하기</button>
    </ButtonsStyle>
  );
};

export default PostCardButtons;
