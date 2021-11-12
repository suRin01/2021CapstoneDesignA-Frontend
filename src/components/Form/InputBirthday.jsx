import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const BirthdayBoxStyle = styled.div`
  display: inline-block;
  width: 600px;
  height: 60px;
  padding-left: 18px;
  border: 1px solid #000000;
  border-radius: 3px;
  vertical-align: middle;

  & > input {
    float: left;
    width: 28%;
    height: 55px;
    border: 0;
    text-align: center;
    font-size: 1.5rem;

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
      font-size: 14px;
      color: #ccc;
      line-height: 42px;
      text-align: center;
    }
  }

  &:focus-within {
    --saf-0: rgba(var(--sk_highlight, 18, 100, 163), 1);
    box-shadow: 0 0 0 1px var(--saf-0), 0 0 0 5px rgba(29, 155, 209, 0.3);
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

const InputBirthday = ({ year, month, day, onChangeYear, onChangeMonth, onChangeDay }) => {
  return (
    <BirthdayBoxStyle>
      <input type="text" value={year} placeholder="YYYY" maxLength="4" onChange={onChangeYear} />
      <span />
      <input type="text" value={month} placeholder="MM" maxLength="2" onChange={onChangeMonth} />
      <span />
      <input type="text" value={day} placeholder="DD" maxLength="2" onChange={onChangeDay} />
    </BirthdayBoxStyle>
  );
};

InputBirthday.propTypes = {
  year: PropTypes.string.isRequired,
  month: PropTypes.string.isRequired,
  day: PropTypes.string.isRequired,
  onChangeYear: PropTypes.func.isRequired,
  onChangeMonth: PropTypes.func.isRequired,
  onChangeDay: PropTypes.func.isRequired,
};

export default InputBirthday;
