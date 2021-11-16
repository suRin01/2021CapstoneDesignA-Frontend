import React, { useCallback, useEffect, useMemo, useRef } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

// component
import CommentOption from "./CommentOption";
import CommentReply from "./CommentReply";
import Avatar from "../common/Avatar";
import Menu from "../common/Menu";
import Icon from "../common/Icon";

// 사용자 정의 hook
import useButton from "../../hooks/useButton";

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  padding: 1rem 0 0 1rem;

  .container {
    position: relative;
    display: flex;

    &:hover {
      .option__button {
        border-radius: 100%;
        align-self: center;
        height: 35px;
        transition: all 0.75s;

        &:hover {
          background-color: rgba(0, 0, 0, 0.1);
          transition: all 0s;
        }
        .option__icon {
          display: inline-block;
          background-image: url("https://static.xx.fbcdn.net/rsrc.php/v3/yE/r/R3l5SniutOc.png");
          background-position: -105px -107px;
          background-size: auto;
          width: 20px;
          height: 20px;
          background-repeat: no-repeat;
        }
      }
    }

    .comment__data {
      display: flex;
      flex-direction: column;
      background: #f0f2f5;
      padding: 0.5rem;
      border-radius: 4px;
      box-shadow: 2px 2px 5px #d1d1d1;
      margin-right: 1rem;

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

const CommentSingle = ({
  profileImagePath,
  commentList,
  comment,
  contents,
  onAddCommentExcute,
  onChangeContents,
  onRemoveCommentExcute,
  resizeTextarea,
}) => {
  const menuRef = useRef();
  const [isShowRecomment, onClickToggleRecomment] = useButton(false);
  const [isShowOptionMenu, onClickOptionMenu, setIsShowOptionMenu] = useButton(false);
  const commentAvarterStyle = useMemo(
    () => ({ width: "35px", height: "35px", marginRight: "10px" }),
    [],
  );
  const [mouseHoverRemove, onMouseHoverRemove] = useButton(true);

  // 메뉴창 이외의 것을 클릭 시 메뉴창 닫히게 하는 코드
  useEffect(() => {
    // 메뉴 닫기 이벤트 핸들러
    const onCloseMenu = e => {
      if (isShowOptionMenu && !menuRef.current?.contains(e.current)) setIsShowOptionMenu(false);
    };

    // 메뉴 닫기 이벤트 등록
    window.addEventListener("click", onCloseMenu);

    // 메뉴 닫기 이벤트 등록 해제
    return () => window.removeEventListener("click", onCloseMenu);
  }, [isShowOptionMenu, menuRef.current]);

  // 대댓글 개수 구하기
  const getRecommentNumber = useCallback(() => {
    return commentList.filter(vComment => vComment.CommentId === comment._id).length;
  }, [commentList]);

  // 대댓글이 존재하면 대댓글 컴포넌트 호출
  const showRecomment = useCallback(() => {
    // 현 댓글의 대댓글들 찾기
    const recommentList = commentList.filter(vComment => vComment.CommentId === comment._id);

    // 찾은 대댓글들 화면에 그리기
    return recommentList.map(vComment => (
      <CommentReply
        key={vComment._id}
        profileImagePath={profileImagePath}
        commentList={commentList}
        comment={vComment}
        contents={contents}
        onAddCommentExcute={onAddCommentExcute}
        onRemoveCommentExcute={onRemoveCommentExcute}
        onChangeContents={onChangeContents}
        resizeTextarea={resizeTextarea}
      />
    ));
  }, [
    profileImagePath,
    commentList,
    contents,
    onAddCommentExcute,
    onRemoveCommentExcute,
    onChangeContents,
    resizeTextarea,
  ]);

  return (
    <>
      {/* 대댓글이 아니라면 랜더링 */}
      {!comment.CommentId && (
        <Wrapper>
          {/* 유저의 프로필이미지 */}
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

            {isShowOptionMenu && (
              <Menu menu ref={menuRef}>
                <button type="button">수정</button>
                <button
                  type="button"
                  onClick={() => onRemoveCommentExcute(comment._id)}
                  onMouseEnter={onMouseHoverRemove}
                  onMouseLeave={onMouseHoverRemove}
                >
                  {mouseHoverRemove ? (
                    <>
                      <Icon shape="trash" />
                      <span>삭제</span>
                    </>
                  ) : (
                    <>
                      <Icon shape="fillTrash" />
                      <span style={{ color: "blue" }}>삭제</span>
                    </>
                  )}
                </button>
              </Menu>
            )}

            {/* 댓글 수정 및 삭제를 위한 옵션버튼 */}
            <button className="option__button">
              <i className="option__icon" onClick={onClickOptionMenu} />
            </button>
          </section>

          {/* 댓글의 옵션버튼들 ( 좋아요, 싫어요, 답글달기 ) */}
          <CommentOption
            profileImagePath={profileImagePath}
            contents={contents}
            updatedAt={comment.updatedAt}
            onAddCommentExcute={onAddCommentExcute}
            onChangeContents={onChangeContents}
            resizeTextarea={resizeTextarea}
            CommentId={comment._id}
          />

          {/* 대댓글 더보기 버튼 */}
          {getRecommentNumber() > 0 && (
            <button
              type="button"
              onClick={onClickToggleRecomment}
              className="recomments__toggle__btn"
            >
              {getRecommentNumber()}개 답글더보기
            </button>
          )}

          {/* 대댓글이 존재하면 대댓글 컴포넌트 보여주기 */}
          {isShowRecomment && showRecomment()}
        </Wrapper>
      )}
    </>
  );
};

CommentSingle.propTypes = {
  profileImagePath: PropTypes.string,
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
  contents: PropTypes.string.isRequired,
  onAddCommentExcute: PropTypes.func.isRequired,
  onChangeContents: PropTypes.func.isRequired,
  onRemoveCommentExcute: PropTypes.func.isRequired,
  resizeTextarea: PropTypes.func.isRequired,
};

export default CommentSingle;
