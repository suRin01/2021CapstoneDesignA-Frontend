import React, { useEffect, useState, useCallback } from "react";
import { withRouter } from "react-router";
import styled from "styled-components";
// api
// import { apiLogin } from "../api";

import PropTypes from "prop-types";

import PostCard from "../components/PostCard/PostCard";
import Profile from "../components/Profile/Profile";

import { fakeDataGenerator } from "../util";
// 사용자 정의 hook
import useUser from "../hooks/useUser";

const ProfileStyle = styled.section`
  width: 100%;
`;

const PostStyle = styled.ul`
  width: 100%;
  padding: 2rem;
  margin-bottom: 3vh;
  background-color: #ffffff;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
`;

const initPosts = [
  {
    // 게시글자체에 연관된 내용
    _id: 1,
    content: "대충 게시글 내용",
    updatedAt: Date.now(),

    // 게시글을 작성한 유저
    User: {
      _id: 1,
      name: "testUser",
      // 게시글 작성 유저의 프로필이미지
      Image: {
        path: "https://avatars.githubusercontent.com/u/63289318?v=4",
      },
    },

    // 게시글에 좋아요 누른 사람 리스트 ( 최초에 개수만 세고, 마우스 hover시 name리스트 보여주기 )
    Like: [
      {
        _id: 1,
        name: "aa",
      },
      {
        _id: 2,
        name: "bb",
      },
    ],

    // 게시글에 댓글단 사람 리스트 ( 여기 데이터는 개수를 세기위한 데이터라 식별자만 요청함... 나중에 댓글보기를 클릭할 경우 해당 게시글의 댓글을 10개씩 끊어서 가져오도록 설계하기 )
    Comment: [],

    Image: [
      {
        _id: 1,
        path: "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAxOTA0MjFfMTcw%2FMDAxNTU1ODQzNTEzODAw.2Q5KNKYAuQI6c228AriUfj8KRGv8RjoWTjaGulQV164g._7NbQejnS6EMSIr87jDdlJ214kBwHKz3cXbi-mg1Vc4g.PNG.sejinsatam%2Fimage.png&type=sc960_832",
      },
    ],
  },
];
const ProfilePage = ({ post, match, history }) => {
  //const [isMine] = useState(user?._id === post.User._id);
  const [user] = useUser();
  const [posts, setPosts] = useState([...initPosts]);
  //
  useEffect(() => {
    console.log(`UserId : ${match.params.UserId}를 이용해서 서버에다가 정보요청`);
    // 단, 로그인한유저와 현재 페이지에서 요청하는 유저의 아이디값이 일치한다면, 따로 요청하지 않고 현재 localStorage에 있는 데이터 이용하고 특정 기능들 추가로 부여
  });
  //-----
  // 게시글 패치
  const fetchPosts = useCallback(async () => {
    // 게시글 가져오기 api 호출
    const lastId = posts[posts.length - 1]._id;
    // await apiFetchPosts(lastId)

    // 임시처리
    setPosts(prev => [...prev, fakeDataGenerator()]);
  }, []);

  // 최초 게시글들의 데이터 불러오기
  useEffect(() => {
    fetchPosts();
  }, []);

  // 게시글 삭제
  const onRemovePost = useCallback(PostId => {
    setPosts(prev => prev.filter(post => post._id !== PostId));
  }, []);

  if (!posts) return <h2>게시글 데이터를 불러오는 중입니다...</h2>;

  return (
    <>
      {/*<h1>ProfilePage - {match.params.UserId}</h1>*/}
      <ProfileStyle>
        <Profile user={match.params.UserId} post={post} />
        {/*<PostStyle>게시글</PostStyle>*/}
        {posts.map(post => (
          <PostCard key={post._id} post={post} onRemovePost={onRemovePost} />
        ))}
      </ProfileStyle>
    </>
  );
};

export default withRouter(ProfilePage);
