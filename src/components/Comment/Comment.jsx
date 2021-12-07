import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";

// component
import CommentForm from "./CommentForm";
import CommentSingle from "./CommentSingle";

// 사용자 정의 hook
import useTextArea from "../../hooks/useTextArea";

// api
import { apiFetchComments, apiAppendComment, apiRemoveComment } from "../../api";

const Comment = ({ user, PostId, onAddCommentHome, onRemoveCommentHome }) => {
  const [comments, setComments] = useState([]);
  const [content, onChangeContent, , resizeTextarea] = useTextArea("");

  // 최초 댓글들 패치
  useEffect(() => {
    (async () => {
      setComments(await apiFetchComments(PostId));
    })();
  }, []);

  // 실제로 state에 댓글 추가
  const onAddComment = useCallback(() => {
    (async () => {
      setComments(await apiFetchComments(PostId));
    })();

    console.log("comment refetch");
  }, []);

  // 실제 state에 댓글과 대댓글 삭제
  const onRemoveComment = useCallback(parentId => {
    setComments(prev =>
      prev.filter(comment => {
        if (comment._id === parentId) return false;
        if (comment.parentId === parentId) return false;
        return true;
      }),
    );
  }, []);

  // 댓글 추가(제출)
  const onAddCommentExcute = useCallback(
    async (e, parentId, textareaRef, onClickToggleRecomment) => {
      e.preventDefault();

      // 비로그인시
      if (!user) return alert("로그인후에 댓글을 작성해주세요");

      // 입력하지 않은 경우
      if (!content.trim()) return alert("내용을 작성해주세요");

      // 댓글 추가 요청 api
      await apiAppendComment({
        postId: +PostId,
        content,
        parentId: parentId ? +parentId : null,
      });
      // 상위 컴포넌트에 댓글 개수만 추가
      onAddCommentHome(PostId);
      // 사용하는 state에 댓글 추가
      // >> Date.now()를 createdComentId로 바꿔줘야함
      onAddComment();

      // 댓글 내용 초기화
      textareaRef.current.value = "";

      // 대댓글 입력했다면 창닫기
      // onClickToggleRecomment?.();
    },
    [user, PostId, content, onAddCommentHome, onAddComment],
  );

  // 댓글 삭제
  const onRemoveCommentExcute = useCallback(
    async parentId => {
      // api요청
      apiRemoveComment(parentId);

      // 상위 컴포넌트에 댓글 개수만 제거
      onRemoveCommentHome(PostId);

      // 사용하는 state에 댓글과 대댓글 제거
      onRemoveComment(parentId);
    },
    [PostId, onRemoveCommentHome, onRemoveComment],
  );

  return (
    <section className="comments__container">
      <CommentForm
        profileImagePath={user?.Image.path}
        content={content}
        onAddCommentExcute={onAddCommentExcute}
        onChangeContent={onChangeContent}
        resizeTextarea={resizeTextarea}
      />
      {comments &&
        comments.map(comment => (
          <CommentSingle
            key={comment._id}
            profileImagePath={user?.Image.path}
            commentList={comments}
            comment={comment}
            content={content}
            onAddCommentExcute={onAddCommentExcute}
            onChangeContent={onChangeContent}
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
