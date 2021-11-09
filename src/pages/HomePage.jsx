import React, { useCallback, useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import styled from "styled-components";

// components
import PostCard from "../components/common/PostCard/PostCard";

// import { apiFetchPosts } from "../api";

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

// 임시
import faker from "faker";
faker.locale = "ko";
// 임시 게시글 데이터 생성기
function fakeDataGenerator() {
  return {
    _id: faker.datatype.number(),
    content: "서버랑 연동하면 입력한 텍스트로 게시글 추가됨",
    updatedAt: faker.date.between("2021-01-01", "2021-10-06"),
    User: {
      name: faker.name.findName(),
      Image: {
        path: faker.image.avatar(),
      },
    },

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

    Comment: [
      {
        _id: 1,
      },
      {
        _id: 2,
      },
      {
        _id: 3,
      },
    ],

    Image: [
      {
        _id: 1,
        path: faker.image.image(),
      },
      {
        _id: 2,
        path: faker.image.image(),
      },
      {
        _id: 3,
        path: faker.image.image(),
      },
      {
        _id: 4,
        path: faker.image.image(),
      },
      {
        _id: 5,
        path: faker.image.image(),
      },
    ],
  };
}

const HomePage = ({ history }) => {
  const [posts, setPosts] = useState([
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
          path: "https://search.pstatic.net/common?type=n&size=174x174&quality=95&direct=true&src=https%3A%2F%2Fmusicmeta-phinf.pstatic.net%2Falbum%2F003%2F192%2F3192546.jpg%3Ftype%3Dr204Fll%26v%3D20210529225516",
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
      Comment: [
        {
          _id: 1,
        },
        {
          _id: 2,
        },
        {
          _id: 3,
        },
      ],

      Image: [
        {
          _id: 1,
          path: "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAxOTA0MjFfMTcw%2FMDAxNTU1ODQzNTEzODAw.2Q5KNKYAuQI6c228AriUfj8KRGv8RjoWTjaGulQV164g._7NbQejnS6EMSIr87jDdlJ214kBwHKz3cXbi-mg1Vc4g.PNG.sejinsatam%2Fimage.png&type=sc960_832",
        },
      ],
    },
  ]);
  const [isThrottling, setIsThrottling] = useState(false);

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

  // 무한 스크롤링처리 + 스로틀링
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

        // 지금은 임시로 setTimeout()사용했지만 나중에는 await에서 응답올 때 까지 기다리고 실행하므로
        // api요청을 한번만 보내고 응답할 때 까지 재요청 보내지 않음
        setTimeout(() => {
          setIsThrottling(false);
        }, 1000);
      }
    }
    // 스크롤이벤트 등록
    document.addEventListener("scroll", scrollToLoad);
    // 스크롤이벤트 등록해제
    return () => {
      document.removeEventListener("scroll", scrollToLoad);
    };
  }, [isThrottling]);

  // 게시글 삭제
  const onRemovePost = useCallback(PostId => {
    setPosts(prev => prev.filter(post => post._id !== PostId));
  }, []);

  if (!posts) return <h2>게시글 데이터를 불러오는 중입니다...</h2>;

  return (
    <>
      <PostCardStyle>
        <WritePostWrapper>
          <button type="button" onClick={() => history.push("/write")}>
            게시글 생성하기
          </button>
        </WritePostWrapper>

        {posts.map(post => (
          <PostCard key={post._id} post={post} onRemovePost={onRemovePost} />
        ))}
      </PostCardStyle>
    </>
  );
};

export default withRouter(HomePage);
