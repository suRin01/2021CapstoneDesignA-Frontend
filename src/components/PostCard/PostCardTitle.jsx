import React, { useEffect, useRef, useState } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import styled from "styled-components";

// components
import Avatar from "../common/Avatar";
import Menu from "../common/Menu";
import Icon from "../common/Icon";

// 사용자 정의 hook
import useButton from "../../hooks/useButton";

// util
import { timeFormat } from "../../util";

const TitleStyle = styled.li`
  display: flex;
  justify-content: space-between;
  padding: 0 2rem;
`;
const TitleLeftStyle = styled.div`
  display: flex;
`;
const TitleCenterStyle = styled.div`
  display: flex;
  flex-direction: column;
`;
const AuthorStyle = styled.span`
  font-size: 1.2rem;
  font-weight: bold;
`;
const CreateTimeStyle = styled.span`
  color: #444444;
`;
const OptionButtonStyle = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 3rem;
  height: 3rem;
  border-radius: 100%;
  transition: all 1.5s;
  transform: translate(10px, -10px);

  &:hover {
    transition: all 0s;
    background-color: rgba(0, 0, 0, 0.05);
  }
`;

const PostCardTitle = ({ history, user, post, onRemovePost }) => {
  const menuRef = useRef();
  const [isMine] = useState(user?._id === post.User._id);
  const [isOpenMenu, onClickMenu, setIsOpenMenu] = useButton(false);
  // const [mouseHoverEdit, onMouseHoverEdit] = useButton(true);
  const [mouseHoverRemove, onMouseHoverRemove] = useButton(true);

  // 메뉴창 이외에 다른 곳을 클릭하면 메뉴창 닫기
  useEffect(() => {
    const onCloseMenu = e => {
      if (isOpenMenu && !menuRef.current?.contains(e.target)) setIsOpenMenu(false);
    };

    // 메뉴 닫기 이벤트 등록
    window.addEventListener("click", onCloseMenu);

    // 메뉴 닫기 이벤트 등록 해제
    return () => window.removeEventListener("click", onCloseMenu);
  }, [isOpenMenu, menuRef.current]);

  return (
    <TitleStyle>
      <TitleLeftStyle>
        {/* 유저의 프로필 이미지 */}
        <Avatar
          src={
            post.User.Image.path === ""
              ? undefined
              : `${process.env.REACT_APP_SERVER}/images/${post.User.Image.path}`
          }
          width={60}
          height={60}
          marginRight={10}
        />

        {/* 작성자와 작성시간 */}
        <TitleCenterStyle>
          <AuthorStyle>{post.User.name}</AuthorStyle>
          <CreateTimeStyle>{timeFormat(post.updatedAt)}</CreateTimeStyle>
        </TitleCenterStyle>
      </TitleLeftStyle>

      {/* 옵션버튼 ( 게시글 수정 및 삭제 ) */}
      <OptionButtonStyle type="button" onClick={onClickMenu}>
        <Icon shape="menu" />
        {isOpenMenu &&
          (isMine ? (
            <Menu menu ref={menuRef}>
              <button type="button" onClick={() => history.push(`/write/${post._id}`)}>
                수정
              </button>
              <button
                type="button"
                onClick={() => onRemovePost(post._id)}
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
          ) : (
            <Menu menu ref={menuRef}>
              <button type="button">게시글 숨기기</button>
              <button type="button">게시글 신고하기</button>
            </Menu>
          ))}
      </OptionButtonStyle>
    </TitleStyle>
  );
};

PostCardTitle.propTypes = {
  user: PropTypes.oneOfType([
    PropTypes.shape({
      _id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      Image: PropTypes.shape({
        path: PropTypes.string.isRequired,
      }),
    }),
  ]),
  post: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    updatedAt: PropTypes.string.isRequired,
    User: PropTypes.shape({
      name: PropTypes.string.isRequired,
      Image: PropTypes.shape({
        path: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
    Like: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
      }).isRequired,
    ).isRequired,
    Comment: PropTypes.number.isRequired,
    Image: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.number.isRequired,
        path: PropTypes.string.isRequired,
      }).isRequired,
    ).isRequired,
  }).isRequired,
  onRemovePost: PropTypes.func.isRequired,
};

export default withRouter(PostCardTitle);
