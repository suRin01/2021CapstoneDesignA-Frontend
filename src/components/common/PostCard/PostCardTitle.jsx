import React, { useCallback, useState } from "react";
import { withRouter } from "react-router-dom";
import styled from "styled-components";
import PropTypes from "prop-types";

import { timeFormat } from "../../../filter/dateGenerator";

import useButton from "../../../hooks/useButton";

// components
import Avatar from "../../common/Avatar";
import MenuCopy from "../../common/MenuCopy";

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
const OptionButtonIconStyle = styled.i`
  display: inline-block;
  background-image: url("https://static.xx.fbcdn.net/rsrc.php/v3/yE/r/R3l5SniutOc.png");
  background-position: -105px -107px;
  background-size: auto;
  width: 20px;
  height: 20px;
  background-repeat: no-repeat;
`;

const PostCardTitle = ({ history, user, post, onRemovePost }) => {
  const [isShowOptionMenu, onClickOptionMenu] = useButton(false);
  const [isMine] = useState(user?._id === post.User._id);

  const showMenu = useCallback(() => {
    if (isShowOptionMenu) {
      if (isMine) {
        return (
          <MenuCopy>
            <button type="button" onClick={() => history.push(`/write/${post._id}`)}>
              수정
            </button>
            <button type="button" onClick={() => onRemovePost(post._id)}>
              삭제
            </button>
          </MenuCopy>
        );
      } else {
        return (
          <MenuCopy>
            <button type="button">게시글 숨기기</button>
            <button type="button">게시글 신고하기</button>
          </MenuCopy>
        );
      }
    }
  }, [isMine, isShowOptionMenu]);

  return (
    <TitleStyle>
      <TitleLeftStyle>
        {/* 유저의 프로필 이미지 */}
        <Avatar src={post.User.Image.path} width={60} height={60} marginRight={10} />

        {/* 작성자와 작성시간 */}
        <TitleCenterStyle>
          <AuthorStyle>{post.User.name}</AuthorStyle>
          <CreateTimeStyle>{timeFormat(post.updatedAt)}</CreateTimeStyle>
        </TitleCenterStyle>
      </TitleLeftStyle>

      {/* 옵션버튼 ( 게시글 수정 및 삭제 ) */}
      <OptionButtonStyle type="button" onClick={onClickOptionMenu}>
        <OptionButtonIconStyle></OptionButtonIconStyle>
        {showMenu()}
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
    _id: PropTypes.number.isRequired,
    content: PropTypes.string.isRequired,
    updatedAt: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.number]).isRequired,
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
    Comment: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.number.isRequired,
      }).isRequired,
    ).isRequired,
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
