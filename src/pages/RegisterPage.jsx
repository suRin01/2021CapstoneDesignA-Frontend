import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { withRouter } from "react-router";
import styled from "styled-components";

// component
import Form from "../components/Form/Form";
import Label from "../components/Form/Label";
import Input from "../components/Form/Input";
import InputBirthday from "../components/Form/InputBirthday";
import Button from "../components/Form/Button";
import Text from "../components/Form/Text";
import Icon from "../components/common/Icon";

// 사용자 정의 hook
import useInput from "../hooks/useInput";

// api
// import { apiRegister } from "../api";

// util
import { validate } from "../util";

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
const GenderAndPrWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  font-size: 1.2rem;
  font-weight: 550;
  margin-bottom: 2rem;

  & > div {
    display: flex;
    align-items: center;
  }

  & > div > input {
    width: 1.5rem;
    height: 1.5rem;
  }
`;
const ProfileImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 100px;
  background: #f0f0f0;
  border-radius: 100%;
  cursor: pointer;
  transition: all 0.5s;

  & > img {
    width: 100%;
    height: 100%;
    background-size: cover;
    border-radius: 100%;
  }
  &:hover {
    background: #d4d4d4;
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
  const [gender, onChangeGender] = useInput(null);
  const [profileImage, setProfileImage] = useState(null);

  // 프로필 이미지 Base64, ref
  const [profileImageBase64, setProfileImageBase64] = useState(null);
  const profileImageRef = useRef(null);

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

  // 프로필 이미지 등록
  const onProfileImage = useCallback(
    e => {
      // 프로필 이미지 등록 ( 저장용 )
      setProfileImage(e.target.files[0]);

      // preview용도
      const reader = new FileReader();
      reader.onload = () => setProfileImageBase64(reader.result);
      reader.readAsDataURL(e.target.files[0]);
    },
    [setProfileImage, setProfileImageBase64],
  );

  // 프로필 이미지 클릭
  const onClickProfileImage = useCallback(() => {
    profileImageRef.current.click();
  }, [profileImageRef.current]);

  // 프로필 이미지 drop 처리
  const onDropImage = useCallback(
    e => {
      e.preventDefault();
      // 프로필 이미지 등록 ( 저장용 )
      setProfileImage(e.dataTransfer.files[0]);

      // preview용도
      const reader = new FileReader();
      reader.onload = () => setProfileImageBase64(reader.result);
      reader.readAsDataURL(e.dataTransfer.files[0]);
    },
    [setProfileImage, setProfileImageBase64],
  );

  // 회원가입 데이터 전송
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
      if (!gender) return alert("성별을 체크해주세요!");

      const formData = new FormData();

      formData.append("id", id);
      formData.append("password", password);
      formData.append("email", email);
      formData.append("name", name);
      formData.append("phone", phone);
      formData.append("year", year);
      formData.append("month", month);
      formData.append("day", day);
      formData.append("gender", gender);
      formData.append("profileImage", profileImage);

      // try {
      //   const data = await apiRegister(formData);
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
      gender,
      profileImage,
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

        <Label name="gender">성별</Label>
        <GenderAndPrWrapper>
          <div>
            <span>남자</span>
            <input type="radio" name="gender" value={1} onChange={onChangeGender} />
          </div>
          <div>
            <span>여자</span>
            <input type="radio" name="gender" value={0} onChange={onChangeGender} />
          </div>
        </GenderAndPrWrapper>

        <Label name="gender">프로필 이미지</Label>
        <input
          type="file"
          onChange={onProfileImage}
          style={{ display: "none" }}
          ref={profileImageRef}
        />
        <ProfileImageWrapper
          onClick={onClickProfileImage}
          onDragOver={e => e.preventDefault()}
          onDrop={onDropImage}
        >
          {profileImageBase64 ? <img src={profileImageBase64} /> : <Icon shape="imageAppend" />}
        </ProfileImageWrapper>

        <Button type="submit">회원가입</Button>
      </Form>
    </Container>
  );
};

export default withRouter(RegisterPage);
