import React, { useCallback, useMemo, useRef } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

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
    overflow: hidden;
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

const CommentForm = ({
  profileImagePath,
  contents,
  onSubmitComment,
  onChangeContents,
  resizeContents,
  CommentId,
}) => {
  const textareaRef = useRef();
  const avarterStyle = useMemo(() => ({
    width: "35px",
    height: "35px",
    marginRight: "10px",
  }));

  const onEnterPress = useCallback(
    e => {
      if (e.keyCode === 13 && e.shiftKey === false) {
        onSubmitComment(e, CommentId, textareaRef);
      }
    },
    [contents, CommentId, textareaRef],
  );

  return (
    <Wrapper onSubmit={e => onSubmitComment(e, CommentId, textareaRef)}>
      {profileImagePath ? (
        <Avatar src={profileImagePath} alt="유저 프로필 이미지" style={avarterStyle} />
      ) : (
        <Avatar alt="유저 프로필 이미지" style={avarterStyle} />
      )}
      <textarea
        type="text"
        placeholder="댓글을 입력하세요"
        className="comments__textarea"
        onChange={onChangeContents}
        ref={textareaRef}
        onKeyDown={e => {
          onEnterPress(e);
          resizeContents(textareaRef.current);
        }}
        onKeyUp={() => resizeContents(textareaRef.current)}
      />
      <button type="submit" className="comments__btn">
        생성
      </button>
    </Wrapper>
  );
};

CommentForm.propTypes = {
  profileImagePath: PropTypes.string,
  contents: PropTypes.string.isRequired,
  onSubmitComment: PropTypes.func.isRequired,
  onChangeContents: PropTypes.func.isRequired,
  resizeContents: PropTypes.func.isRequired,
  CommentId: PropTypes.number,
};

export default CommentForm;
