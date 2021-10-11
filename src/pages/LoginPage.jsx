import React, { useCallback, useMemo } from "react";
import { withRouter } from "react-router";
import styled from "styled-components";

import Form from "../components/common/Form";
import Label from "../components/common/Label";
import Input from "../components/common/Input";
import Button from "../components/common/Button";

import useInput from "../hooks/useInput";

// import { apiLogin } from "../api";

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
  const [id, onChangeId] = useInput("");
  const [password, onChangePassword] = useInput("");

  // 인라인 스타일
  const marginBottom = useMemo(() => ({ marginBottom: "1.5rem" }));

  const onLogin = useCallback(
    async e => {
      e.preventDefault();

      if (!(id && id.trim() && password && password.trim())) return alert("아이디와 비밀번호 모두 입력해주세요!");

      console.log("id >> ", id);
      console.log("password >> ", password);
      // try {
      //   const data = await apiLogin();
      //   history.push("/");
      // } catch (error) {
      //   alert(error.response.data);
      // }
    },
    [id, password],
  );

  return (
    <Container>
      <Title>로그인 - JSBird</Title>
      <Form onSubmit={onLogin}>
        <Label>아이디</Label>
        <Input type="text" value={id} onChange={onChangeId} placeholder="아이디를 입력해주세요" style={marginBottom} />

        <Label>비밀번호</Label>
        <Input
          type="password"
          value={password}
          onChange={onChangePassword}
          placeholder="비밀번호를 입력해주세요"
          style={marginBottom}
        />

        <Button type="submit">로그인</Button>
      </Form>
    </Container>
  );
};

export default withRouter(LoginPage);
