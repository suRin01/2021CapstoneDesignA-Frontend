import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";

import useInput from "../../hooks/useInput";
import useUser from "../../hooks/useUser";

// api
// import { apiRegister } from "../api";

// util
import { validate } from "../../util";

const UserDataStyle = styled.form`
  display: grid;
  grid-template-columns: 1fr 2fr;
  padding: 2.5rem 0.5rem;
  gap: 2.5rem 0;
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
  padding-left: 1rem;
  padding-right: 0.5rem;

  height: 50px;

  &:focus {
    border: 2px solid #dadada;
  }
`;

const Btns = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 1rem 0;
  gap: 20px;
`;

const Birth = styled.div`
  display: inline-block;
  width: 100%;
  height: 50px;
  border: 1px solid #dadada;
  border-radius: 3px;
  vertical-align: middle;

  & > input {
    float: left;
    width: 28%;
    height: 46px;
    border: 0;
    text-align: center;
    font-size: 1.2rem;

    &::placeholder {
      font-size: 1rem;
    }
  }

  & > span {
    &::after {
      content: "/";
      float: left;
      width: 22px;
      height: 100%;
      font-size: 15px;
      color: #dadada;
      line-height: 42px;
      text-align: center;
    }
  }
  &:focus-within {
    border: 2px solid #dadada;
  }

  @media only screen and (max-width: 768px) {
    width: 400px;
    height: 40px;

    & > input {
      height: 38px;
      font-size: 1rem;

      &::placeholder {
        font-size: 0.8rem;
      }
    }
  }
`;

const TextareaStyle = styled.textarea`
  width: 100%;
  border: 1px solid #dadada;
  outline: none;
  border-radius: 3px;
  font-size: 1rem;
  padding: 0.7rem 1rem;
  resize: none;
  height: 100px;

  &:focus {
    border: 2px solid #dadada;
  }
`;

const UserData = ({ history }) => {
  const [user] = useUser();
  console.log(user);
  // 실제 사용하는 값을 저장할 변수들
  const id = user?._id;
  const [name, onChangeName] = useInput(user.name);
  const [email, , setEmail] = useInput("");
  const [phone, , setPhone] = useInput("");
  const [year, , setYear] = useInput("");
  const [month, , setMonth] = useInput("");
  const [day, , setDay] = useInput("");
  const [fileUrl, setFileUrl] = useState(user.Image.path);
  const [gender, , setGender] = useInput("T");

  const [introduce, , setIntroduce] = useInput("");

  // 값 유효성 체크를 위한 변수들
  const [isValidateEmail, setIsValidateEmail] = useState(false);
  const [isValidatePhone, setIsValidatePhone] = useState(false);
  const [isValidateYear, setIsValidateYear] = useState(false);
  const [isValidateMonth, setIsValidateMonth] = useState(false);
  const [isValidateDay, setIsValidateDay] = useState(false);
  const [isValidateBirthday, setIsValidateBirthday] = useState(false);

  // 포커스를 위한 변수
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const phoneRef = useRef(null);
  const brithRef = useRef(null);
  const introduceRef = useRef(null);

  // 유효성검사와 포커스
  const validateAndFocus = useCallback((validate, ref, message) => {
    if (validate) return true;

    ref?.current?.select();
    ref?.current?.scrollIntoView();

    alert(message);
    return false;
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

  //성별 변경
  const onChangeGender = useCallback(e => {
    setGender(e.target.value);
  }, []);
  //소개글 작성
  const onChangeIntoduce = useCallback(e => {
    setIntroduce(e.target.value);
  }, []);

  const onModify = useCallback(
    async e => {
      e.preventDefault();

      if (!validateAndFocus(name, nameRef, "이름을 입력해주세요")) return;
      if (!validateAndFocus(isValidateEmail, emailRef, "이메일을 제대로 입력해주세요")) return;
      if (!validateAndFocus(isValidatePhone, phoneRef, "휴대폰번호를 제대로 입력해주세요")) return;
      if (!validateAndFocus(isValidateBirthday, brithRef, "생일을 제대로 입력해주세요")) return;

      console.log("img >> ", fileUrl);
      console.log("name >> ", name);
      console.log("introduce >> ", introduce);
      console.log("email >> ", email);
      console.log("phone >> ", phone);
      console.log("year >> ", year);
      console.log("month >> ", month);
      console.log("day >> ", day);
      console.log("gender >> ", gender);
      // try {
      //   const data = await apiRegister();
      //   alert(`${data.name}님 회원 정보 변경에 성공하셨습니다.`);
      //   history.push(`/profile/${user?._id}`);
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
      gender,
      introduce,
      fileUrl,
      isValidateEmail,
      isValidatePhone,
      isValidateBirthday,
    ],
  );

  //프로필 이미지 수정

  const hiddenFileInput = React.useRef(null);

  function processImage(event) {
    const imageFile = event.target.files[0];
    const imageUrl = URL.createObjectURL(imageFile);
    setFileUrl(imageUrl);
  }
  function profileChang() {
    hiddenFileInput.current.click();
  }

  return (
    <>
      <UserDataStyle onSubmit={onModify} id="modifyForm">
        <ProfileImg src={fileUrl} />
        <div>
          <LabelStyle style={{ display: "block", margin: "0 0 10px 0" }}>{id}</LabelStyle>
          <BtnStyle type="button" onClick={profileChang}>
            프로필이미지 바꾸기
            <input
              type="file"
              accept="image/*"
              onChange={processImage}
              style={{ display: "none" }}
              ref={hiddenFileInput}
            />
          </BtnStyle>
        </div>
        <LabelStyle>사용자 이름</LabelStyle>
        <InputTextStyle
          placeholder="사용자 이름"
          value={name}
          ref={nameRef}
          onChange={onChangeName}
        />
        <LabelStyle>소개글</LabelStyle>
        <TextareaStyle
          placeholder="소개글 입력"
          value={introduce}
          ref={introduceRef}
          onChange={onChangeIntoduce}
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
        <Birth>
          <input
            type="text"
            value={year}
            placeholder="YYYY"
            maxLength="4"
            onChange={onChangeYear}
          />
          <span />
          <input
            type="text"
            value={month}
            placeholder="MM"
            maxLength="2"
            onChange={onChangeMonth}
          />
          <span />
          <input type="text" value={day} placeholder="DD" maxLength="2" onChange={onChangeDay} />
        </Birth>

        <LabelStyle>성별</LabelStyle>
        <div>
          <input
            type="radio"
            name="gander"
            value="T"
            checked={gender == "T"}
            onChange={onChangeGender}
          />
          <LabelStyle style={{ margin: "0 50px 0 0 " }}>남</LabelStyle>
          <input
            type="radio"
            name="gander"
            value="F"
            checked={gender == "F"}
            onChange={onChangeGender}
          />
          <LabelStyle>여</LabelStyle>
        </div>
      </UserDataStyle>
      <Btns>
        <BtnStyle type="reset" onClick={() => history.push(`/profile/${user?._id}`)}>
          취소
        </BtnStyle>
        <BtnStyle type="submit" form="modifyForm">
          저장
        </BtnStyle>
      </Btns>
    </>
  );
};

export default withRouter(UserData);
