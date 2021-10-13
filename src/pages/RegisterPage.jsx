import React, { forwardRef, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { withRouter } from "react-router";
import styled from "styled-components";

import Form from "../components/common/Form";
import Label from "../components/common/Label";
import Input from "../components/common/Input";
import InputBirthday from "../components/common/InputBirthday";
import Button from "../components/common/Button";
import Text from "../components/common/Text";

import useInput from "../hooks/useInput";

// import { apiRegister } from "../api";

import { validate } from "../filter/vaildate";

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

const RegisterPage = ({ history }) => {
  // 실제 사용하는 값을 저장할 변수들
  const [name, onChangeName] = useInput("");
  const [id, , setId] = useInput("");
  const [password, , setPassword] = useInput("");
  const [passwordCheck, , setPasswordCheck] = useInput("");
  const [email, , setEmail] = useInput("");
  const [phone, , setPhone] = useInput("");
  const [year, , setYear] = useInput("");
  const [month, , setMonth] = useInput("");
  const [day, , setDay] = useInput("");
  // const [gender, onChangeGender] = useInput(true);

  // 값 유효성 체크를 위한 변수들
  const [isValidateId, setIsValidateId] = useState(false);
  const [isValidatePassword, setIsValidatePassword] = useState(false);
  const [isValidatePasswordCheck, setIsValidatePasswordCheck] = useState(false);
  const [isValidateEmail, setIsValidateEmail] = useState(false);
  const [isValidatePhone, setIsValidatePhone] = useState(false);
  const [isValidateYear, setIsValidateYear] = useState(false);
  const [isValidateMonth, setIsValidateMonth] = useState(false);
  const [isValidateDay, setIsValidateDay] = useState(false);
  const [isValidateBirthday, setIsValidateBirthday] = useState(false);

  // 포커스를 위한 변수
  const nameRef = useRef(null);
  const idRef = useRef(null);
  const passwordRef = useRef(null);
  const passwordCheckRef = useRef(null);
  const emailRef = useRef(null);
  const phoneRef = useRef(null);
  // 페이지 입장시 최초 포커스
  useEffect(() => {
    nameRef.current?.focus();
  }, [nameRef.current]);

  // 유효성검사와 포커스
  const validateAndFocus = useCallback((validate, ref, message) => {
    if (validate) return true;

    ref?.current?.select();
    ref?.current?.scrollIntoView();

    alert(message);
    return false;
  }, []);

  // 아이디 변경 및 유효성 검사
  const onChangeId = useCallback(e => {
    setId(e.target.value);
    setIsValidateId(validate("id", e.target.value));
  }, []);
  // 비밀번호 변경 및 유효성 검사
  const onChangePassword = useCallback(e => {
    setPassword(e.target.value);
    setIsValidatePassword(validate("password", e.target.value));
  }, []);
  // 비밀번호 확인 변경 및 유효성 검사
  const onChangePasswordCheck = useCallback(
    e => {
      setPasswordCheck(e.target.value);
      setIsValidatePasswordCheck(password === e.target.value);
    },
    [password],
  );
  // 이메일 변경 및 유효성 검사
  const onChangeEmail = useCallback(e => {
    setEmail(e.target.value);
    setIsValidateEmail(validate("email", e.target.value));
  }, []);
  // 휴대폰번호 변경 및 유효성 검사
  const onChangePhone = useCallback(e => {
    setPhone(e.target.value);
    setIsValidatePhone(validate("phone", e.target.value));
  }, []);
  // 년 변경 및 유효성 검사
  const onChangeYear = useCallback(
    e => {
      const validateValue = validate("year", e.target.value);
      setYear(e.target.value);
      setIsValidateYear(validateValue);
      if (validateValue && isValidateMonth && isValidateDay) setIsValidateBirthday(true);
      else setIsValidateBirthday(false);
    },
    [isValidateMonth, isValidateDay],
  );
  // 월 변경 및 유효성 검사
  const onChangeMonth = useCallback(
    e => {
      const validateValue = validate("month", e.target.value);
      setMonth(e.target.value);
      setIsValidateMonth(validateValue);
      if (isValidateYear && validateValue && isValidateDay) setIsValidateBirthday(true);
      else setIsValidateBirthday(false);
    },
    [isValidateYear, isValidateDay],
  );
  // 일 변경 및 유효성 검사
  const onChangeDay = useCallback(
    e => {
      const validateValue = validate("day", e.target.value);
      setDay(e.target.value);
      setIsValidateDay(validateValue);
      if (isValidateYear && isValidateMonth && validateValue) setIsValidateBirthday(true);
      else setIsValidateBirthday(false);
    },
    [isValidateYear, isValidateMonth],
  );

  // 인라인 스타일
  const marginBottom = useMemo(() => ({ marginBottom: "1.5rem" }));

  const onRegister = useCallback(
    async e => {
      e.preventDefault();

      if (!validateAndFocus(name, nameRef, "이름을 입력해주세요")) return;
      if (!validateAndFocus(isValidateId, idRef, "아이디를 제대로 입력해주세요")) return;
      if (!validateAndFocus(isValidatePassword, passwordRef, "비밀번호를 제대로 입력해주세요"))
        return;
      if (!validateAndFocus(isValidatePasswordCheck, passwordCheckRef, "비밀번호를 일치시켜주세요"))
        return;
      if (!validateAndFocus(isValidateEmail, emailRef, "이메일을 제대로 입력해주세요")) return;
      if (!validateAndFocus(isValidatePhone, phoneRef, "휴대폰번호를 제대로 입력해주세요")) return;
      if (!validateAndFocus(isValidateBirthday, null, "생일을 제대로 입력해주세요")) return;

      console.log("id >> ", id);
      console.log("password >> ", password);
      console.log("passwordCheck >> ", passwordCheck);
      console.log("email >> ", email);
      console.log("name >> ", name);
      console.log("phone >> ", phone);
      console.log("year >> ", year);
      console.log("month >> ", month);
      console.log("day >> ", day);

      // try {
      //   const data = await apiRegister();
      //   alert(`${data.name}님 회원가입에 성공하셨습니다. 로그인 페이지로 이동됩니다.`);
      //   history.push("/login");
      // } catch (error) {
      //   alert(error.response.data);
      // }
    },
    [
      id,
      password,
      passwordCheck,
      email,
      name,
      phone,
      year,
      month,
      day,
      isValidateId,
      isValidatePassword,
      isValidatePasswordCheck,
      isValidateEmail,
      isValidatePhone,
      isValidateBirthday,
    ],
  );

  return (
    <Container>
      <Title>회원가입 - JSBird</Title>
      <Form onSubmit={onRegister}>
        <Label>이름</Label>
        <Input
          type="text"
          value={name}
          onChange={onChangeName}
          placeholder="이름을 입력해주세요"
          style={marginBottom}
          ref={nameRef}
        />

        <Label>아이디</Label>
        <Input
          type="text"
          value={id}
          onChange={onChangeId}
          placeholder="아이디를 입력해주세요"
          ref={idRef}
        />
        <Text isValidate={isValidateId}>
          숫자와 영어가 최소 한 글자 이상 포함되고, 최소 6자리여야 합니다.
        </Text>

        <Label>비밀번호</Label>
        <Input
          type="password"
          value={password}
          onChange={onChangePassword}
          placeholder="비밀번호를 입력해주세요"
          ref={passwordRef}
        />
        <Text isValidate={isValidatePassword}>
          숫자와 영어가 최소 한 글자 이상 포함되고, 최소 8자리여야 합니다.
        </Text>

        <Label>비밀번호 확인</Label>
        <Input
          type="password"
          value={passwordCheck}
          onChange={onChangePasswordCheck}
          placeholder="비밀번호를 입력해주세요"
          ref={passwordCheckRef}
        />
        <Text isValidate={isValidatePasswordCheck}>비밀번호를 확인해주세요</Text>

        <Label>이메일</Label>
        <Input
          type="text"
          value={email}
          onChange={onChangeEmail}
          placeholder="예) JSBird@naver.com"
          ref={emailRef}
        />
        <Text isValidate={isValidateEmail}>이메일 형식에 맞게 입력해주세요</Text>

        <Label>폰번호</Label>
        <Input
          type="text"
          value={phone}
          onChange={onChangePhone}
          maxLength={11}
          placeholder="숫자만 입력해주세요"
          ref={phoneRef}
        />
        <Text isValidate={isValidatePhone}>숫자만 11자리 입력해주세요</Text>

        <Label>생일</Label>
        <InputBirthday
          year={year}
          month={month}
          day={day}
          onChangeYear={onChangeYear}
          onChangeMonth={onChangeMonth}
          onChangeDay={onChangeDay}
        ></InputBirthday>
        <Text isValidate={isValidateBirthday}>형식에 맞게 숫자만 입력해주세요</Text>

        <Button type="submit">회원가입</Button>
      </Form>
    </Container>
  );
};

export default withRouter(RegisterPage);
