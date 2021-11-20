import React, { useCallback, useMemo, useRef } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

// component
import Avatar from "../common/Avatar";

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
  onAddCommentExcute,
  onChangeContents,
  resizeTextarea,
  CommentId,
}) => {
  const textareaRef = useRef();
  const avarterStyle = useMemo(
    () => ({
      width: "35px",
      height: "35px",
      marginRight: "10px",
    }),
    [],
  );

  // enter인지 shift + enter인지 판단해서 댓글 추가
  const onEnterPress = useCallback(
    e => {
      if (e.keyCode === 13 && e.shiftKey === false) {
        onAddCommentExcute(e, CommentId, textareaRef);
      }
    },
    [contents, CommentId, textareaRef],
  );

  return (
    <Wrapper onSubmit={e => onAddCommentExcute(e, CommentId, textareaRef)}>
      <Avatar src={profileImagePath} alt="유저 프로필 이미지" style={avarterStyle} />

      <textarea
        type="text"
        placeholder="댓글을 입력하세요"
        className="comments__textarea"
        onChange={onChangeContents}
        ref={textareaRef}
        onKeyDown={e => {
          onEnterPress(e);
          resizeTextarea(textareaRef.current);
        }}
        onKeyUp={() => resizeTextarea(textareaRef.current)}
      />
      <button type="submit" className="comments__btn">
        생성
      </button>
    </Wrapper>
  );
};

CommentForm.propTypes = {
  profileImagePath: PropTypes.oneOfType([PropTypes.string]),
  contents: PropTypes.string.isRequired,
  onAddCommentExcute: PropTypes.func.isRequired,
  onChangeContents: PropTypes.func.isRequired,
  resizeTextarea: PropTypes.func.isRequired,
  CommentId: PropTypes.number,
};

export default CommentForm;