import React, { useCallback, useContext, useEffect, useMemo, useRef } from "react";
import styled from "styled-components";

// component
import Form from "../components/Form/Form";
import Label from "../components/Form/Label";
import Input from "../components/Form/Input";
import Button from "../components/Form/Button";

// 사용자 정의 hook
import useInput from "../hooks/useInput";

// api
import { apiLogin, apiLoadToMe } from "../api";
import UserContext from "context/user";

const Container = styled.section`
  display: flex;
  flex-direction: column;
  background: white;
  padding: 2rem;
  border-radius: 6px;
  box-shadow: 3px 3px 10px gray;
  margin-bottom: 5rem;
`;
const Title = styled.h1`
  text-align: center;
  margin: 1rem 0 2rem;
  font-size: 2.5rem;

  @media only screen and (max-width: 768px) {
    font-size: 1.8rem;
  }
`;

const LoginPage = () => {
  const { setUser } = useContext(UserContext);
  const [username, onChangeUsername] = useInput("");
  const [password, onChangePassword] = useInput("");

  // 인라인 스타일
  const marginBottom = useMemo(() => ({ marginBottom: "1.5rem" }));

  const usernameRef = useRef(null);
  const passwordRef = useRef(null);

  // 페이지 입장시 최초 포커스
  useEffect(() => {
    usernameRef.current?.focus();
  }, [usernameRef.current]);

  const onLogin = useCallback(
    async e => {
      e.preventDefault();

      if (!(username && username.trim())) {
        usernameRef?.current?.focus();
        return alert("아이디를 입력해주세요");
      }
      if (!(password && password.trim())) {
        passwordRef?.current?.focus();
        return alert("비밀번호를 입력해주세요");
      }

      try {
        await apiLogin({ username, password });
        setUser(await apiLoadToMe());
      } catch (error) {
        console.error(error);
        alert(error.response.data);
      }
    },
    [username, password],
  );

  return (
    <Container>
      <Title>로그인 - JSBird</Title>
      <Form onSubmit={onLogin}>
        <Label>아이디</Label>
        <Input
          type="text"
          value={username}
          onChange={onChangeUsername}
          placeholder="아이디를 입력해주세요"
          style={marginBottom}
          ref={usernameRef}
        />

        <Label>비밀번호</Label>
        <Input
          type="password"
          value={password}
          onChange={onChangePassword}
          placeholder="비밀번호를 입력해주세요"
          style={marginBottom}
          ref={passwordRef}
        />

        <Button type="submit">로그인</Button>
      </Form>
    </Container>
  );
};

export default LoginPage;
