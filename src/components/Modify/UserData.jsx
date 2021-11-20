import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";

// 사용자 정의 hook
import useInput from "../../hooks/useInput";

// api
// import { apiRegister } from "../api";

// util
import { validate } from "../../util";

const UserDataStyle = styled.form`
  display: grid;
  grid-template-columns: 1fr 2fr;
  padding: 2.5rem 0.5rem;
  gap: 3rem 0;
`;

const ProfileImg = styled.img`
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  border: 3px solid #80c2b3;
`;
const BtnStyle = styled.button`
  background-color: #9ddcce;
  height: 2rem;
  font-size: 1rem;
  align-self: center;
  padding: 0 20px;
  border-radius: 5px;

  &:hover {
    transition: all 0s;
    background-color: #80c2b3;
  }
`;

const LabelStyle = styled.label`
  font-size: 1.5rem;
  align-self: center;
`;

const InputTextStyle = styled.input`
  width: 100%;
  border: 1px solid #dadada;
  outline: none;
  border-radius: 3px;
  line-height: 2.5rem;
  font-size: 1.2rem;
  padding-left: 0.5rem;
  padding-right: 0.5rem;

  &:focus {
    border: 2px solid #dadada;
  }

  input[type="file"] {
    position: absolute;
    width: 0;
    height: 0;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    border: 0;
  }
`;

const Btns = styled.div`
  display: flex;
  float: right;
  margin: 1rem 0;
  gap: 20px;
`;

const UserData = ({ user, history }) => {
  // 실제 사용하는 값을 저장할 변수들
  const [name, onChangeName] = useInput("");
  const [id, , setId] = useInput(user);
  const [email, , setEmail] = useInput("");
  const [phone, , setPhone] = useInput("");
  const [year, , setYear] = useInput(2121);
  const [month, , setMonth] = useInput(12);
  const [day, , setDay] = useInput(12);
  //const [gender, onChangeGender] = useInput(true);

  // 값 유효성 체크를 위한 변수들
  const [isValidateId, setIsValidateId] = useState(false);
  const [isValidateEmail, setIsValidateEmail] = useState(false);
  const [isValidatePhone, setIsValidatePhone] = useState(false);
  const [isValidateYear, setIsValidateYear] = useState(false);
  const [isValidateMonth, setIsValidateMonth] = useState(false);
  const [isValidateDay, setIsValidateDay] = useState(false);
  const [isValidateBirthday, setIsValidateBirthday] = useState(false);

  // 포커스를 위한 변수
  const nameRef = useRef(null);
  const idRef = useRef(null);
  const emailRef = useRef(null);
  const phoneRef = useRef(null);
  const brithRef = useRef(null);
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

  const onModify = useCallback(
    async e => {
      e.preventDefault();

      if (!validateAndFocus(name, nameRef, "이름을 입력해주세요")) return;
      if (!validateAndFocus(isValidateId, idRef, "아이디를 제대로 입력해주세요")) return;
      if (!validateAndFocus(isValidateEmail, emailRef, "이메일을 제대로 입력해주세요")) return;
      if (!validateAndFocus(isValidatePhone, phoneRef, "휴대폰번호를 제대로 입력해주세요")) return;
      if (!validateAndFocus(isValidateBirthday, brithRef, "생일을 제대로 입력해주세요")) return;

      console.log("id >> ", id);
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
      email,
      name,
      phone,
      year,
      month,
      day,
      isValidateId,
      isValidateEmail,
      isValidatePhone,
      isValidateBirthday,
    ],
  );

  //프로필 이미지 수정
  const [fileUrl, setFileUrl] = useState(null);
  const hiddenFileInput = React.useRef(null);

  function processImage(event) {
    const imageFile = event.target.files[0];
    const imageUrl = URL.createObjectURL(imageFile);
    setFileUrl(imageUrl);
  }
  function profileChang(event) {
    hiddenFileInput.current.click();
  }
  return (
    <>
      <UserDataStyle onSubmit={onModify}>
        <ProfileImg src={fileUrl} />
        <BtnStyle type="button" onClick={profileChang}>
          프로필 편집
          <input
            type="file"
            accept="image/*"
            onChange={processImage}
            style={{ display: "none" }}
            ref={hiddenFileInput}
          />
        </BtnStyle>
        <LabelStyle>아이디</LabelStyle>
        <InputTextStyle
          placeholder="아이디"
          value={id}
          onChange={onChangeId}
          ref={idRef}
          /*style={{ color: "gray" }}
          readOnly*/
        />

        <LabelStyle>사용자 이름</LabelStyle>
        <InputTextStyle
          placeholder="사용자 이름"
          value={name}
          ref={nameRef}
          onChange={onChangeName}
        />

        <LabelStyle>이메일</LabelStyle>
        <InputTextStyle
          placeholder="email@naver.com"
          type="email"
          value={email}
          onChange={onChangeEmail}
          ref={emailRef}
        />

        <LabelStyle>전화번호</LabelStyle>
        <InputTextStyle
          placeholder="01012341234"
          maxLength={11}
          type="tel"
          value={phone}
          onChange={onChangePhone}
          ref={phoneRef}
        />

        <LabelStyle>생일</LabelStyle>
        {<InputTextStyle placeholder="YYYYMMDD" maxLength={8} />}
        {/*<div>
          <InputTextStyle
            placeholder="yyyy"
            maxLength={4}
            value={year}
            onChangeYear={onChangeYear}
            ref={brithRef}
          />
          <InputTextStyle
            placeholder="mm"
            maxLength={2}
            value={month}
            onChangeMonth={onChangeMonth}
            ref={brithRef}
          />
          <InputTextStyle
            placeholder="dd"
            maxLength={2}
            value={day}
            onChangeDay={onChangeDay}
            ref={brithRef}
          />
        </div>*/}
        <LabelStyle>성별</LabelStyle>
        <div>
          <div>
            <input type="radio" name="gander" value="T" checked />
            <LabelStyle>남</LabelStyle>
            <input type="radio" name="gander" value="F" />
            <LabelStyle>여</LabelStyle>
          </div>
        </div>
        <Btns>
          <BtnStyle type="reset" onClick={() => history.push(`/profile/${user}`)}>
            취소
          </BtnStyle>
          <BtnStyle type="submit">완료</BtnStyle>
        </Btns>
      </UserDataStyle>
    </>
  );
};

export default withRouter(UserData);
