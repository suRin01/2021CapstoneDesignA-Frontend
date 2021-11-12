import React, { useCallback, useEffect, useRef, useState } from "react";
import { withRouter } from "react-router-dom";
import styled from "styled-components";

// 사용자 정의 hook
import useTextArea from "../hooks/useTextArea";

// api
// import { apiAppendPost, apiEditPost, apiFetchPost } from "../api";

const Wrapper = styled.form`
  flex-grow: 1;

  border-radius: 1rem;

  textarea {
    width: 100%;
    padding: 1rem;
    resize: none;
    overflow: hidden;
    box-shadow: 3px 3px 20px gray;
    font-size: 1rem;
    height: 300px;
  }
`;

const WritePostPage = ({ history, match }) => {
  const [content, onChangeContent, setContent, resize] = useTextArea("");
  const textareaRef = useRef();
  const [PostId] = useState(match.params.PostId);

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
        // 게시글 생성 api호출
        // apiAppendPost({ content })

        // 홈페이지 강제이동
        history.push("/");
      }
    } else {
      if (confirm("게시글을 생성할까요?")) {
        // 게시글 수정 api호출
        // apiEditPost({ PostId, content })

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

  return (
    <Wrapper onSubmit={onSubmit}>
      <textarea
        ref={textareaRef}
        value={content}
        onChange={onChangeContent}
        onKeyDown={e => {
          onEnterPress(e);
          resize(textareaRef.current, 300);
        }}
        onKeyUp={() => resize(textareaRef.current, 300)}
        placeholder={`어떤 생각을 하고 계신가요...?\n이미지처리는 나중에 추가하겠음`}
      />
      <button type="submit">submit</button>
    </Wrapper>
  );
};

export default withRouter(WritePostPage);
