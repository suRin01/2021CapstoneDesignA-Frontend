import React, { useEffect, useState, useCallback } from "react";
import { withRouter } from "react-router";
import styled from "styled-components";
// api
// import { apiLogin } from "../api";

import PostCard from "../components/PostCard/PostCard";
import Profile from "../components/Profile/Profile";

import { fakeDataGenerator } from "../util";
// 사용자 정의 hook
import useUser from "../hooks/useUser";

const ProfilePageStyle = styled.section`
  width: 100%;
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
  {
    // 게시글자체에 연관된 내용
    _id: 2,
    content: "대충 게시글 내용2",
    updatedAt: Date.now(),

    // 게시글을 작성한 유저
    User: {
      _id: 2,
      name: "testUser2",
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

const ProfilePage = ({ match }) => {
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

  // 댓글 추가 ( 여기서는 보여지는 개수만 + 1 이고 내용은 추가 없음 )
  const onAddCommentHome = useCallback((PostId, CommentId, RecommentId) => {
    setPosts(prev => {
      return prev.map(post => {
        if (post._id === PostId) {
          return {
            ...post,
            Comment: [...post.Comment, { _id: CommentId, CommentId: RecommentId }],
          };
        }
        return post;
      });
    });
  }, []);

  // 댓글 삭제 ( 여기서는 보여지는 개수만 - 1 이고 내용은 추가 없음 )
  // **댓글의 대댓글의 대댓글 이후부터는 삭제가 안되는데 그거는 추후에 처리함**
  const onRemoveCommentHome = useCallback((PostId, CommentId) => {
    setPosts(prev => {
      return prev.map(post => {
        if (post._id === PostId) {
          return {
            ...post,
            Comment: post.Comment.filter(comment => {
              if (comment._id === CommentId) {
                return false;
              }
              if (comment.CommentId === CommentId) {
                return false;
              }
              return true;
            }),
          };
        }
        return post;
      });
    });
  }, []);

  // 좋아요 버튼을 눌렀을 때 실행
  const onToggleLike = useCallback(
    PostId => {
      if (!user) return alert("로그인 후에 접근해주세요!");

      const targetPost = posts.filter(post => post._id === PostId);
      const isLike = targetPost[0].Like.some(v => v._id === user._id);

      // 이미 좋아요를 눌렀다면 좋아요 삭제
      if (isLike) {
        setPosts(prev =>
          prev.map(post => {
            if (post === targetPost[0]) {
              return {
                ...post,
                Like: post.Like.filter(v => v._id !== user._id),
              };
            }
            return post;
          }),
        );
      }
      // 좋아요를 누르지 않았다면 좋아요 추가
      else {
        setPosts(prev =>
          prev.map(post => {
            if (post === targetPost[0]) {
              return {
                ...post,
                Like: [...post.Like, { _id: user._id, name: user.name }],
              };
            }
            return post;
          }),
        );
      }
    },
    [user, posts],
  );

  if (!posts) return <h2>게시글 데이터를 불러오는 중입니다...</h2>;

  return (
    <>
      <ProfilePageStyle>
        <Profile user={user} />
        {posts.map(post =>
          match.params.UserId == post.User._id ? (
            <PostCard
              key={post._id}
              post={post}
              onRemovePost={onRemovePost}
              onAddCommentHome={onAddCommentHome}
              onRemoveCommentHome={onRemoveCommentHome}
              onToggleLike={onToggleLike}
            />
          ) : (
            ""
          ),
        )}
      </ProfilePageStyle>
    </>
  );
};

export default withRouter(ProfilePage);
