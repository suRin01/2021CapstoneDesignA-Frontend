import React from "react";
import styled from "styled-components";
import { timeFormat } from "../filter/dateGenerator";

// components
import Avatar from "./common/Avatar";

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

const PostCardTitle = ({ post }) => {
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
      <OptionButtonStyle type="button">
        <OptionButtonIconStyle></OptionButtonIconStyle>
      </OptionButtonStyle>
    </TitleStyle>
  );
};

export default PostCardTitle;
