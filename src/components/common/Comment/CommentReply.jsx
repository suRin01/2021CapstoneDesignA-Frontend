import React, { useCallback, useMemo } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import useButton from "../../../hooks/useButton";

import Avatar from "../Avatar";

import CommentOption from "./CommentOption";

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  padding: 1rem 0 0 3rem;

  .container {
    display: flex;

    .comment__data {
      display: flex;
      flex-direction: column;
      background: #f0f2f5;
      padding: 0.5rem;
      border-radius: 4px;
      box-shadow: 2px 2px 5px #d1d1d1;

      .comment__writer {
        font-size: 0.8rem;
        font-weight: bold;
      }
    }
  }

  .recomments__toggle__btn {
    text-align: start;
    margin-left: 45px;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const CommentReply = ({ user, commentList, comment, onSubmitComment, onChangeContents }) => {
  const [isShowRecomment, onClickToggleRecomment] = useButton(false);
  const commentAvarterStyle = useMemo(
    () => ({ width: "35px", height: "35px", marginRight: "10px" }),
    [],
  );

  // 대댓글 개수 ( 출력할 댓글의 아이디를 참조하는 댓글의 개수 구하기 )
  const getRecommentNumber = useCallback(() => {
    return commentList.filter(vComment => vComment.CommentId === comment._id).length;
  }, [commentList]);

  // 답글 존재하면 답글 보여주기
  const showRecomment = useCallback(() => {
    // 현 댓글의 대댓글들 찾기
    const recommentList = commentList.filter(vComment => vComment.CommentId === comment._id);

    // 찾은 대댓글들 화면에 그리기
    return recommentList.map(vComment => (
      <CommentReply
        key={vComment._id}
        user={user}
        commentList={commentList}
        comment={vComment}
        onSubmitComment={onSubmitComment}
        onChangeContents={onChangeContents}
      />
    ));
  }, [user, commentList, onSubmitComment, onChangeContents]);

  return (
    <Wrapper>
      {/* 유저의 프로필이미지 -임시대체- */}
      <section className="container">
        <Avatar
          src={comment.User.Image.path}
          alt="유저 프로필 이미지"
          style={commentAvarterStyle}
        />

        {/* 댓글의 정보 */}
        <section className="comment__data">
          {/* 댓글작성유저이름 및 작성시간 */}
          <span className="comment__writer">{comment.User.name}</span>

          {/* 댓글 내용 */}
          <pre>{comment.contents}</pre>
        </section>
      </section>

      {/* 댓글의 옵션버튼들 ( 좋아요, 싫어요, 답글달기 ) */}
      <CommentOption
        updatedAt={comment.updatedAt}
        onSubmitComment={onSubmitComment}
        onChangeContents={onChangeContents}
        CommentId={comment._id}
      />

      {/* 답글더보기 버튼 */}
      {getRecommentNumber() > 0 && (
        <button type="button" onClick={onClickToggleRecomment} className="recomments__toggle__btn">
          {getRecommentNumber()}개 답글더보기
        </button>
      )}

      {/* 답글 존재하면 답글보여주기 */}
      {isShowRecomment && showRecomment()}
    </Wrapper>
  );
};

CommentReply.propTypes = {
  user: PropTypes.shape({
    _id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    Image: PropTypes.shape({
      path: PropTypes.string.isRequired,
    }),
  }).isRequired,
  commentList: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.number.isRequired,
      contents: PropTypes.string.isRequired,
      createdAt: PropTypes.oneOfType([PropTypes.number, PropTypes.instanceOf(Date)]),
      updatedAt: PropTypes.oneOfType([PropTypes.number, PropTypes.instanceOf(Date)]).isRequired,
      User: PropTypes.shape({
        _id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        Image: PropTypes.shape({
          path: PropTypes.string.isRequired,
        }),
      }),
      CommentId: PropTypes.number,
    }),
  ).isRequired,
  comment: PropTypes.shape({
    _id: PropTypes.number.isRequired,
    contents: PropTypes.string.isRequired,
    createdAt: PropTypes.oneOfType([PropTypes.number, PropTypes.instanceOf(Date)]),
    updatedAt: PropTypes.oneOfType([PropTypes.number, PropTypes.instanceOf(Date)]).isRequired,
    User: PropTypes.shape({
      _id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      Image: PropTypes.shape({
        path: PropTypes.string.isRequired,
      }),
      CommentId: PropTypes.number,
    }),
  }).isRequired,
  onSubmitComment: PropTypes.func.isRequired,
  onChangeContents: PropTypes.func.isRequired,
};

export default CommentReply;
