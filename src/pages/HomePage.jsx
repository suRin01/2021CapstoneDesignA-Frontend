import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

// components
import PostCard from "../components/PostCard/PostCard";
import Icon from "../components/common/Icon";

// api
import { apiFetchPosts, apiLike, apiUnlike } from "../api";

// context
import UserContext from "context/user";

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

const HomePage = () => {
  const history = useHistory();
  const { user } = useContext(UserContext);
  const [posts, setPosts] = useState([]);
  const [isThrottling, setIsThrottling] = useState(false);
  const [hasMorePosts, setHasMorePosts] = useState(true);
  const timerId = useRef(null);

  // 최초 게시글들의 데이터 불러오기
  useEffect(() => {
    (async () => {
      const tempPosts = await apiFetchPosts(0);
      setPosts(prev => [...prev, ...tempPosts]);
    })();
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
        !isThrottling &&
        hasMorePosts
      ) {
        if (timerId.current) return;

        timerId.current = setTimeout(async () => {
          setIsThrottling(true);
          const tempPosts = await apiFetchPosts(posts.length);
          setPosts(prev => [...prev, ...tempPosts]);
          setHasMorePosts(tempPosts.length === 10);
          setIsThrottling(false);
          timerId.current = null;
        }, 0);
      }
    }

    // 스크롤이벤트 등록
    document.addEventListener("scroll", scrollToLoad);
    // 스크롤이벤트 등록해제
    return () => {
      document.removeEventListener("scroll", scrollToLoad);
      setIsThrottling(false);
    };
  }, [isThrottling, hasMorePosts, posts]);

  // 게시글 삭제
  const onRemovePost = useCallback(PostId => {
    setPosts(prev => prev.filter(post => post._id !== PostId));
  }, []);

  // 댓글 추가 ( 여기서는 보여지는 개수만 + 1 이고 내용은 추가 없음 )
  const onAddCommentHome = useCallback(PostId => {
    setPosts(prev => {
      return prev.map(post => {
        if (post._id === PostId) {
          return {
            ...post,
            Comment: post.Comment + 1,
          };
        }
        return post;
      });
    });
  }, []);

  // 댓글 삭제 ( 여기서는 보여지는 개수만 - 1 이고 내용은 추가 없음 )
  const onRemoveCommentHome = useCallback(PostId => {
    setPosts(prev => {
      return prev.map(post => {
        if (post._id === PostId) {
          return {
            ...post,
            Comment: post.Comment - 1,
          };
        }
        return post;
      });
    });
  }, []);

  // 좋아요 버튼을 눌렀을 때 실행
  const onToggleLike = useCallback(
    async PostId => {
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
        await apiLike({ PostId });
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
        await apiUnlike({ PostId });
      }
    },
    [user, posts],
  );

  if (!posts)
    return (
      <h2>
        생성된 게시글이 없거나, <br />
        게시글 데이터를 불러오는 중입니다...
      </h2>
    );

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

export default HomePage;
