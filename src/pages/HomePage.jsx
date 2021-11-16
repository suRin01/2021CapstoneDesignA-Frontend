import React, { useCallback, useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import styled from "styled-components";

// components
import PostCard from "../components/PostCard/PostCard";
import Icon from "../components/common/Icon";

// 사용자 정의 hook
import useUser from "../hooks/useUser";

// api
// import { apiFetchPosts } from "../api";

// util >> 이거는 서버연동해서 게시글 생성되면 삭제
import { fakeDataGenerator } from "../util";

const PostCardStyle = styled.section`
  width: 100%;
`;
const WritePostWrapper = styled.section`
  margin-bottom: 3vh;
  padding: 1rem;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 0 10px grey;

  button {
    display: flex;
    justify-content: center;
    align-items: end;
    width: 100%;
    background: rgba(0, 0, 0, 0.075);
    border-radius: 5px;
    padding: 0.8rem;
    transition: all 1s;

    &:hover {
      background: rgba(0, 0, 0, 0.2);
      transition: all 0s;
    }
  }
`;

// >> 이것도 서버연동해서 게시글 생성되면 삭제
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

const HomePage = ({ history }) => {
  const [user] = useUser();
  const [posts, setPosts] = useState([...initPosts]);
  const [isThrottling, setIsThrottling] = useState(false);

  // 게시글 패치
  const fetchPosts = useCallback(async () => {
    // 게시글 가져오기 api 호출
    // const lastId = posts[posts.length - 1]._id;
    // const { posts } = await apiFetchPosts(lastId)

    // 임시처리 >> 이후에 서버로 응답온 값을 넣어줌 >> ...posts
    setPosts(prev => [...prev, fakeDataGenerator()]);
  }, []);

  // 최초 게시글들의 데이터 불러오기
  useEffect(() => {
    fetchPosts();
  }, []);

  // 무한 스크롤링처리 + 쓰로틀링
  // 무한 스크롤링은 "페이지 최하단 - 현재 스크롤바 위치 < 500px" 이면 서버로 게시글 로드 요청 보냄
  // 쓰로틀링은 게시글요청을 보내고 응답이 오기 전까지 다시 요청을 보내지 않음 ( 의미없는 중복요청 제거 )
  useEffect(() => {
    // 스크롤이벤트에 등록할 함수
    async function scrollToLoad() {
      if (
        window.scrollY + document.documentElement.clientHeight >
          document.documentElement.scrollHeight - 500 &&
        !isThrottling
      ) {
        setIsThrottling(true);
        // const lastId = posts[posts.length - 1]._id;
        // const posts = await apiFetchPosts(lastId)
        // setPosts(prev => [...prev, ...posts]);
        console.log("스크롤");

        // >> 지금은 임시로 setTimeout()사용해서 1초동안 재요청 보내지 않음
        // >> 실제로 테스트를 해보지 않아서 제대로 동작할지는 미지수
        setTimeout(() => {
          setIsThrottling(false);
        }, 1000);
      }
    }
    // 스크롤이벤트 등록
    document.addEventListener("scroll", scrollToLoad);
    // 스크롤이벤트 등록해제
    return () => document.removeEventListener("scroll", scrollToLoad);
  }, [isThrottling]);

  /**
   * 주석 추후에 삭제
   * 게시글 추가는 필요 없는 이유
   * 게시글 페이지 생성 페이지가 따로 있기 때문에 게시글 생성 페이지 -> 메인 페이지로 이동 시
   * useEffect()가 실행함으로서 게시글이 새로 로드됨
   */

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
      <PostCardStyle>
        {/* 게시글 생성 버튼 */}
        <WritePostWrapper>
          <button type="button" onClick={() => history.push("/write")}>
            <Icon shape="postWrite" />
            <b>게시글 생성하기</b>
          </button>
        </WritePostWrapper>

        {/* 게시글들, 댓글들 */}
        {posts.map(post => (
          <PostCard
            key={post._id}
            post={post}
            onRemovePost={onRemovePost}
            onAddCommentHome={onAddCommentHome}
            onRemoveCommentHome={onRemoveCommentHome}
            onToggleLike={onToggleLike}
          />
        ))}
      </PostCardStyle>
    </>
  );
};

export default withRouter(HomePage);
