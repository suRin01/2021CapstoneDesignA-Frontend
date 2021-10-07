import React, { useEffect, useState } from "react";
import styled from "styled-components";

// components
import PostCard from "../components/PostCard";

const PostCardStyle = styled.section`
  width: 100%;
`;

// 임시
import faker from "faker";
faker.locale = "ko";
// 임시 게시글 데이터 생성기
function fakeDataGenerator() {
  return {
    _id: faker.datatype.number(),
    content: faker.lorem.text(),
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

const HomePage = () => {
  const [posts, setPosts] = useState([
    {
      // 게시글자체에 연관된 내용
      _id: 1,
      content: "대충 게시글 내용",
      updatedAt: Date.now(),

      // 게시글을 작성한 유저
      User: {
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
    fakeDataGenerator(),
    fakeDataGenerator(),
    fakeDataGenerator(),
    fakeDataGenerator(),
    fakeDataGenerator(),
    fakeDataGenerator(),
  ]);

  // 최초 게시글들의 데이터 불러오기
  useEffect(() => {
    console.log("여기서 게시글 데이터 10개 불러오기");
  }, []);

  // 무한 스크롤링처리
  useEffect(() => {
    // 스크롤이벤트에 등록할 함수
    function scrollToLoad() {
      if (window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 500) {
        const lastId = posts[posts.length - 1]._id;

        // 임시.. 실제로 처리할 땐 몇가지 더 추가해야함
        setPosts(prev => [
          ...prev,
          fakeDataGenerator(),
          fakeDataGenerator(),
          fakeDataGenerator(),
          fakeDataGenerator(),
          fakeDataGenerator(),
        ]);
      }
    }

    // 스크롤이벤트 등록
    document.addEventListener("scroll", scrollToLoad);

    // 스크롤이벤트 등록해제
    return () => {
      document.removeEventListener("scroll", scrollToLoad);
    };
  }, []);

  if (!posts) return <h2>게시글 데이터를 불러오는 중입니다...</h2>;

  return (
    <>
      <PostCardStyle>
        {posts.map(post => (
          <PostCard key={post._id} post={post} />
        ))}
      </PostCardStyle>
    </>
  );
};

export default HomePage;
