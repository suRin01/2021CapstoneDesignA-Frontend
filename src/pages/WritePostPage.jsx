import React, { useCallback, useEffect, useRef, useState } from "react";
import { withRouter, useHistory } from "react-router-dom";
import styled from "styled-components";
import "../css/font.css";

// 사용자 정의 hook
import useTextArea from "../hooks/useTextArea";

// api
// import { apiAppendPost, apiEditPost, apiFetchPost } from "../api";

const Wrapper = styled.form`
  margin-top: 1rem;
  flex-grow: 1;
  font-family: "Noto Sans KR", sans-serif;
  border-radius: 1rem;
  background-color: #d4f0e7;
  padding: 1.6rem;
  font-weight: 600;
  position: relative;

  textarea {
    width: 100%;
    padding: 1rem;
    resize: none;
    overflow: hidden;
    font-size: 1.4rem;
    font-family: "Noto Sans KR", sans-serif;
    border-radius: 1rem;
    border: none;
    height: 300px;
    margin-bottom: 3.1rem;
  }

  button {
    font-family: "Noto Sans KR", sans-serif;
    position: absolute;
    font-size: 1.2rem;
    color: white;
    background-color: #56a87b;
    right: 1.3em;
    padding: 0.4rem 1rem;
    font-weight: 500;
    border-radius: 1rem;
    bottom: 1em;
  }

  /* 뒤로가기 버튼 */
  input[type="button"]:nth-last-of-type(1) {
    cursor: pointer;
    font-family: "Noto Sans KR", sans-serif;
    position: absolute;
    font-size: 1.2rem;
    background-color: #bccec6;
    right: 10.5rem;
    padding: 0.4rem 0.9rem;
    font-weight: 500;
    border-radius: 1rem;
    border: none;
    bottom: 1em;
  }

  /* 이미지 업로드 버튼 */
  input[type="button"]:nth-last-of-type(2) {
    cursor: pointer;
    font-family: "Noto Sans KR", sans-serif;
    position: absolute;
    font-size: 1.2rem;
    background-color: #d4cbe9;
    left: 1.6rem;
    padding: 0.4rem 0.9rem;
    font-weight: 500;
    border-radius: 1rem;
    border: none;
    bottom: 1em;
  }

  /* 보통의 파일 업로드 방식, 기존 UI를 논렌더링 처리하고 이미지 업로드 버튼에 이벤트를 등록함 */
  input[type="file"] {
    display: none;
  }
`;

const Div = styled.div`
  display: inline-block;
  font-size: 1.6rem;
  padding-bottom: 1rem;
`;

const WritePostPage = ({ history, match }) => {
  const [content, onChangeContent, setContent, resize] = useTextArea("");
  const textareaRef = useRef();
  const [PostId] = useState(match.params.PostId);
  const userImgInput = useRef();
  const [files, setFiles] = useState("");

  // 게시글 수정이라면 해당 게시글 정보 가져와서 textarea에 넣기
  useEffect(async () => {
    if (PostId) {
      // setContent(await apiFetchPost(PostId))
      console.log("게시글 수정... 게시글 정보 가져오기 >> ", PostId);
    }
  }, [PostId]);

  const onSubmit = useCallback(() => {
    console.log("content >> ", content);

    if (PostId) {
      if (confirm("게시글을 수정할까요?")) {
        // 홈페이지 강제이동
        history.push("/");
      }
    } else {
      if (confirm("게시글을 생성할까요?")) {
        // 게시글 수정 api호출
        // apiEditPost({ PostId, content })
        console.log("게시글 생성");
        // 홈페이지 강제이동
        history.push("/");
      }
    }
  }, [PostId, content]);

  // enter인지 shift + enter인지 확인
  const onEnterPress = useCallback(
    e => {
      if (e.keyCode === 13 && e.shiftKey === false) {
        onSubmit();
      }
    },
    [content],
  );

  // '뒤로' 버튼을 눌렀을 때 첫 화면으로 돌아감
  const goBack = useCallback(() => {
    console.log("맨 처음 페이지로 이동");
    history.push("/");
  });

  // 이미지 업로드 버튼을 클릭하면 기존의 이벤트를 삭제하고 ref에 지정된 사용자 정의 컴포넌트로 이벤트를 연결
  const ImgInputBtnClick = e => {
    event.preventDefault();
    userImgInput.current.click();
  };

  // 이미지 업로드가 완료되면 파일을 읽어오는 디버깅 코드. files state를 update함. 즉 서버에 보낼 이미지 객체임.
  // 현 코드에서 서버 연동을 위한 axois는 고려되지 않음.
  const onLoadImg = e => {
    const file = e.target.files;
    console.log(file);
    setFiles(file);
  };

  return (
    <Wrapper onSubmit={onSubmit}>
      <Div>게시글 생성하기</Div>
      <input type="file" ref={userImgInput} multiple accept="image/*" onChange={onLoadImg} />
      <input type="button" value="📷 이미지 업로드" onClick={ImgInputBtnClick} />
      <input type="button" value="뒤로" onClick={goBack} />
      <button type="submit">💚 게시하기</button>
      <textarea
        ref={textareaRef}
        value={content}
        onChange={onChangeContent}
        onKeyDown={e => {
          onEnterPress(e);
          resize(textareaRef.current, 300);
        }}
        onKeyUp={() => resize(textareaRef.current, 300)}
        placeholder={`어떤 생각을 하고 계신가요?`}
      />
    </Wrapper>
  );
};

export default withRouter(WritePostPage);
