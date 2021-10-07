import React, { useMemo } from "react";
import { Link, NavLink } from "react-router-dom";
import styled from "styled-components";

import useButton from "../../hooks/useButton";

const NavStyle = styled.nav`
  position: sticky;
  top: 0;
  padding: 0.5rem;
  background-color: #ffffff;
  box-shadow: 0px 0px 10px #999;
`;
const NavContainerStyle = styled.ul`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: baseline;

  /* 수정필요 */
  @media only screen and (max-width: 768px) {
    flex-direction: column;
    align-items: center;

    & > section {
      display: ${({ isShowLink }) => !isShowLink && "none"};
      flex-direction: column;
      & > li {
        padding: 1.5rem 40vw;
      }
    }

    // 로고
    & > section:first-child {
      display: flex;
      align-self: flex-start;
      & > li {
        padding: 0;
      }
    }

    // 햄버거메뉴
    & > section:last-child {
      display: flex;
    }
    & button {
      display: flex;
    }
  }
`;
const NavLeftSection = styled.section`
  /* 임시 */
  font-weight: bold;
  font-size: 2rem;
`;
const NavCenterSection = styled.section`
  display: inline-flex;
  justify-content: center;

  & > li {
    display: inline-block;
  }
  & > li > a {
    display: inline-block;
    padding: 1.5rem 2.5rem;
    border-radius: 5px;
    text-align: center;
  }
  & > li > a:hover {
    background-color: #e0e0e0;
  }
`;
const NavRightSection = styled.section`
  display: flex;

  & > li > a {
    padding: 1.5rem 2.5rem;
    border-radius: 5px;
    text-align: center;
  }
  & > li > a:hover {
    background-color: #e0e0e0;
  }
`;
const HamburgerSection = styled.section`
  position: absolute;
  top: 0;
  right: 0;
`;
const HamburgerButton = styled.button`
  display: none;
  flex-direction: column;
  & > span {
    width: 3rem;
    border-bottom: 5px solid black;
    margin: 5px 0;
  }
`;

const NavigationBar = () => {
  const [isShowLink, onChangeShowLink] = useButton(true);
  const activeLinkStyle = useMemo(() => ({ color: "#1977f1" }), []);

  return (
    <NavStyle>
      <NavContainerStyle isShowLink={isShowLink}>
        {/* 좌측영역 ( 로고 ) */}
        <NavLeftSection>
          <li>
            <Link to="/">LOGO</Link>
          </li>
        </NavLeftSection>

        {/* 중간영역 ( 링크 ) */}
        <NavCenterSection>
          <li>
            <NavLink to="/" activeStyle={activeLinkStyle} exact>
              HOME
            </NavLink>
          </li>
          <li>
            <NavLink to="/friend" activeStyle={activeLinkStyle}>
              FRIEND
            </NavLink>
          </li>
        </NavCenterSection>

        {/* 우측영역 ( 설정 ) */}
        <NavRightSection>
          <li>
            <NavLink to="/login" activeStyle={activeLinkStyle}>
              LOGIN
            </NavLink>
          </li>
          <li>
            <NavLink to="/register" activeStyle={activeLinkStyle}>
              REGISTER
            </NavLink>
          </li>
        </NavRightSection>

        <HamburgerSection>
          <HamburgerButton type="button" onClick={onChangeShowLink}>
            <span></span>
            <span></span>
            <span></span>
          </HamburgerButton>
        </HamburgerSection>
      </NavContainerStyle>
    </NavStyle>
  );
};

export default NavigationBar;
