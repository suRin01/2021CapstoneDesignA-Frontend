import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { withRouter } from "react-router";
import styled from "styled-components";

// component
import Form from "../components/Form/Form";
import Label from "../components/Form/Label";
import Input from "../components/Form/Input";
import Button from "../components/Form/Button";

// 사용자 정의 hook
import useInput from "../hooks/useInput";

// api
import { apiLogin } from "../api";

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

const LoginPage = ({ history }) => {
  const [id, onChangeId] = useInput("");
  const [password, onChangePassword] = useInput("");

  // 인라인 스타일
  const marginBottom = useMemo(() => ({ marginBottom: "1.5rem" }));

  const idRef = useRef(null);
  const passwordRef = useRef(null);

  // 페이지 입장시 최초 포커스
  useEffect(() => {
    idRef.current?.focus();
  }, [idRef.current]);

  const onLogin = useCallback(
    async e => {
      e.preventDefault();

      if (!(id && id.trim())) {
        idRef?.current?.focus();
        return alert("아이디를 입력해주세요");
      }
      if (!(password && password.trim())) {
        passwordRef?.current?.focus();
        return alert("비밀번호를 입력해주세요");
      }

      try {
        await apiLogin({ id, password });
      } catch (error) {
        alert(error.response.data);
      } finally {
        history.push("/");
      }
    },
    [id, password],
  );

  return (
    <Container>
      <Title>로그인 - JSBird</Title>
      <Form onSubmit={onLogin}>
        <Label>아이디</Label>
        <Input
          type="text"
          value={id}
          onChange={onChangeId}
          placeholder="아이디를 입력해주세요"
          style={marginBottom}
          ref={idRef}
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

export default withRouter(LoginPage);
