import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

// component
import CommentForm from "./CommentForm";

// util
import { timeFormat } from "../../util";

const Wrapper = styled.section`
  margin-left: 45px;

  button {
    font-weight: 700;
    color: gray;

    &:hover {
      text-decoration: underline;
    }
  }

  .time {
    color: gray;
    font-size: 0.8rem;
  }
`;

const CommentOption = ({
  profileImagePath,
  contents,
  createdAt,
  onAddCommentExcute,
  onChangeContents,
  resizeTextarea,
  parentId,
}) => {
  const [isShowForm, setIsShowComments] = useState(false);

  const onClickShowForm = () => {
    setIsShowComments(!isShowForm);
  };

  return (
    <Wrapper>
      <button type="button">좋아요</button>
      <button type="button" onClick={onClickShowForm}>
        답글달기
      </button>
      <span className="time">{timeFormat(createdAt)}</span>
      {isShowForm && (
        <CommentForm
          profileImagePath={profileImagePath}
          contents={contents}
          onAddCommentExcute={onAddCommentExcute}
          onChangeContents={onChangeContents}
          resizeTextarea={resizeTextarea}
          parentId={parentId}
        />
      )}
    </Wrapper>
  );
};

CommentOption.propTypes = {
  profileImagePath: PropTypes.string,
  contents: PropTypes.string.isRequired,
  createdAt: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.number]).isRequired,
  onAddCommentExcute: PropTypes.func.isRequired,
  onChangeContents: PropTypes.func.isRequired,
  resizeTextarea: PropTypes.func.isRequired,
  parentId: PropTypes.number,
};

export default CommentOption;
