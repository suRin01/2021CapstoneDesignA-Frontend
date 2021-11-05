import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { timeFormat } from "../../../filter/dateGenerator";

import CommentForm from "./CommentForm";

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

const CommentOption = ({ updatedAt, onSubmitComment, onChangeContents, CommentId }) => {
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
      <span className="time">{timeFormat(updatedAt)}</span>
      {isShowForm && (
        <CommentForm
          onSubmitComment={onSubmitComment}
          onChangeContents={onChangeContents}
          CommentId={CommentId}
        />
      )}
    </Wrapper>
  );
};

CommentOption.propTypes = {
  updatedAt: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.number]).isRequired,
  onSubmitComment: PropTypes.func.isRequired,
  onChangeContents: PropTypes.func.isRequired,
  CommentId: PropTypes.number,
};

export default CommentOption;
