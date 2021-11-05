import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";

import useUser from "../../../hooks/useUser";
import useInput from "../../../hooks/useInput";

// import { apiFetchComments, apiAppendComment } from "../../../api";

import CommentForm from "./CommentForm";
import CommentSingle from "./CommentSingle";

const Comment = ({ PostId }) => {
  const [user] = useUser();
  const [comments, setComments] = useState([]);
  const [contents, onChangeContents] = useInput("");

  // 해당 게시글의 댓글들 패치
  const onFetchComments = useCallback(async () => {
    // setComments(await apiFetchComments(PostId));

    // 테스트용, useCallback의 contents, user도 삭제 ( DB연결을 아직 안해서 직접 입력 )
    setComments(prev => [
      ...prev,
      {
        _id: Date.now(),
        contents,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        User: user,
      },
    ]);
  }, [PostId, contents, user]);

  // 최초 댓글들 패치
  useEffect(async () => {
    // 나중에 서버연결시 주석풀기
    // await onFetchComments();
  }, []);

  // 댓글 제출
  const onSubmitComment = useCallback(
    async (e, CommentId, textareaRef, onClickToggleRecomment) => {
      e.preventDefault();

      // 비로그인시
      if (!user) return alert("로그인후에 댓글을 작성해주세요");

      // 입력하지 않은 경우
      if (!contents.trim()) return alert("내용을 작성해주세요");

      // 테스트용
      console.group("댓글 임시 출력 시작");
      console.log("댓글 작성 >> ", contents);
      console.log("CommentId >> ", CommentId);
      console.groupEnd();

      // 테스트 대댓글용 ( else부분만 살리기 )
      if (CommentId) {
        setComments(prev => [
          ...prev,
          {
            _id: Date.now(),
            contents,
            createdAt: Date.now(),
            updatedAt: Date.now(),
            User: user,
            CommentId,
          },
        ]);
      } else {
        // await apiAppendComments({ UserId: user._id, PostId, contents, CommentId });
        onFetchComments();
      }

      // 댓글 내용 초기화
      textareaRef.current.value = "";

      // 대댓글 입력했다면 창닫기
      onClickToggleRecomment?.();
      console.log("onClickToggleRecomment >> ", onClickToggleRecomment);
    },
    [user, PostId, contents],
  );

  return (
    <section className="comments__container">
      <CommentForm onSubmitComment={onSubmitComment} onChangeContents={onChangeContents} />
      {comments &&
        comments.map(comment => (
          <CommentSingle
            key={comment._id}
            commentList={comments}
            comment={comment}
            onSubmitComment={onSubmitComment}
            onChangeContents={onChangeContents}
          />
        ))}
    </section>
  );
};

Comment.propTypes = {
  PostId: PropTypes.number.isRequired,
};

export default Comment;
