import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";

// component
import CommentForm from "./CommentForm";
import CommentSingle from "./CommentSingle";

// 사용자 정의 hook
import useTextArea from "../../hooks/useTextArea";

// api
// import { apiFetchComments, apiAppendComment, apiRemoveComment } from "../../../api";

const Comment = ({ user, PostId, onAddCommentHome, onRemoveCommentHome }) => {
  const [comments, setComments] = useState([]);
  const [contents, onChangeContents, , resizeTextarea] = useTextArea("");

  // 최초 댓글들 패치 >> 나중에 서버연결시 주석풀기
  useEffect(async () => {
    // setComments(await apiFetchComments(PostId));
  }, []);

  // 실제로 state에 댓글 추가
  const onAddComment = useCallback(
    (_id, contents, CommentId) => {
      setComments(prev => [
        ...prev,
        {
          _id,
          contents,
          createdAt: Date.now(),
          updatedAt: Date.now(),
          User: user,
          CommentId,
        },
      ]);
    },
    [user],
  );

  // 실제 state에 댓글과 대댓글 삭제
  const onRemoveComment = useCallback(CommentId => {
    setComments(prev =>
      prev.filter(comment => {
        if (comment._id === CommentId) return false;
        if (comment.CommentId === CommentId) return false;
        return true;
      }),
    );
  }, []);

  // 댓글 추가(제출)
  const onAddCommentExcute = useCallback(
    async (e, CommentId, textareaRef, onClickToggleRecomment) => {
      e.preventDefault();

      // 비로그인시
      if (!user) return alert("로그인후에 댓글을 작성해주세요");

      // 입력하지 않은 경우
      if (!contents.trim()) return alert("내용을 작성해주세요");

      // >> Math.floor(new Date().getTime() / 1000)는 나중에 생성한 댓글의 아이디로 변경
      // 댓글 추가 요청 api
      // const { CommentId } = await apiAppendComments({ UserId: user._id, PostId, contents, CommentId });
      // 상위 컴포넌트에 댓글 개수만 추가
      onAddCommentHome(PostId, Math.floor(new Date().getTime() / 1000), CommentId);
      // 사용하는 state에 댓글 추가
      onAddComment(Math.floor(new Date().getTime() / 1000), contents, CommentId);

      // 댓글 내용 초기화
      textareaRef.current.value = "";

      // 대댓글 입력했다면 창닫기
      // onClickToggleRecomment?.();
    },
    [user, PostId, contents, onAddCommentHome, onAddComment],
  );

  // 댓글 삭제
  const onRemoveCommentExcute = useCallback(
    async CommentId => {
      // api요청
      // apiRemoveComment(CommentId)

      // 상위 컴포넌트에 댓글 개수만 제거
      onRemoveCommentHome(PostId, CommentId);

      // 사용하는 state에 댓글과 대댓글 제거
      onRemoveComment(CommentId);
    },
    [PostId, onRemoveCommentHome, onRemoveComment],
  );

  return (
    <section className="comments__container">
      <CommentForm
        profileImagePath={user?.Image.path}
        contents={contents}
        onAddCommentExcute={onAddCommentExcute}
        onChangeContents={onChangeContents}
        resizeTextarea={resizeTextarea}
      />
      {comments &&
        comments.map(comment => (
          <CommentSingle
            key={comment._id}
            profileImagePath={user?.Image.path}
            commentList={comments}
            comment={comment}
            contents={contents}
            onAddCommentExcute={onAddCommentExcute}
            onChangeContents={onChangeContents}
            onRemoveCommentExcute={onRemoveCommentExcute}
            resizeTextarea={resizeTextarea}
          />
        ))}
    </section>
  );
};

Comment.propTypes = {
  user: PropTypes.oneOfType([
    PropTypes.shape({
      _id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      Image: PropTypes.shape({
        path: PropTypes.string.isRequired,
      }),
    }),
  ]),
  PostId: PropTypes.number.isRequired,
  onAddCommentHome: PropTypes.func.isRequired,
  onRemoveCommentHome: PropTypes.func.isRequired,
};

export default Comment;
