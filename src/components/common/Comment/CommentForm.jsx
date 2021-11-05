import React, { useMemo, useRef } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import useUser from "../../../hooks/useUser";

import Avatar from "../Avatar";

const Wrapper = styled.form`
  display: flex;
  padding: 1rem 1rem 0 1rem;

  .comments__textarea {
    flex-grow: 1;
    padding: 0.4rem;
    margin-right: 0.4rem;
    border-radius: 0.4rem;
    resize: none;
  }
  .comments__btn {
    background-color: #000000;
    color: #ffffff;
    border-radius: 0.4rem;
    font-size: 1rem;
    flex-basis: 50px;
    flex-shrink: 0;

    &:hover {
      text-decoration: none;
    }
  }
`;

const CommentForm = ({ onSubmitComment, onChangeContents, CommentId }) => {
  const [user] = useUser();
  const textareaRef = useRef();
  const avarterStyle = useMemo(() => ({ width: "35px", height: "35px", marginRight: "10px" }));

  return (
    <Wrapper onSubmit={e => onSubmitComment(e, CommentId, textareaRef)}>
      {user ? (
        <Avatar src={user.Image.path} alt="유저 프로필 이미지" style={avarterStyle} />
      ) : (
        <Avatar alt="유저 프로필 이미지" style={avarterStyle} />
      )}
      <textarea
        type="text"
        placeholder="댓글을 입력하세요"
        className="comments__textarea"
        onChange={onChangeContents}
        ref={textareaRef}
      />
      <button type="submit" className="comments__btn">
        생성
      </button>
    </Wrapper>
  );
};

CommentForm.propTypes = {
  onSubmitComment: PropTypes.func.isRequired,
  onChangeContents: PropTypes.func.isRequired,
  CommentId: PropTypes.number,
};

export default CommentForm;
