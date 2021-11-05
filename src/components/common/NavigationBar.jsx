import React, { useCallback, useMemo } from "react";
import { Link, NavLink, withRouter } from "react-router-dom";
import styled from "styled-components";

import useButton from "../../hooks/useButton";
import useUser from "../../hooks/useUser";

import Avartar from "./Avatar";
import Menu from "./Menu";

// import { apiLogout } from "../../api";

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
  align-items: center;

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
  align-items: center;

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

  & > .user__menu {
    display: flex;
    padding: 1rem 2rem;
    border-radius: 5px;
    cursor: pointer;

    & > b {
      line-height: 30px;
    }
  }
  & > .user__menu:hover {
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

const NavigationBar = ({ history }) => {
  const [user, setUser] = useUser();
  const [isShowLink, onChangeShowLink] = useButton(true);
  const [isShowMenu, onChangeShowMenu, setIsShowMenu] = useButton(false);
  const activeLinkStyle = useMemo(() => ({ color: "#1977f1" }), []);
  const navAvarterStyle = useMemo(() => ({ width: "35px", height: "35px" }), []);
  const menuAvarterStyle = useMemo(() => ({ width: "50px", height: "50px" }), []);

  const onClickLogout = useCallback(() => {
    // 임시로... 강제 리렌더링을 하기 위해서
    // 지금 임시로 localStorage를 사용하고 있어서 React에서 변경감지를 못함
    localStorage.removeItem("user");
    setUser(JSON.parse(localStorage.getItem("user")));

    // + api로그아웃 요청
    // try {
    //   const data = await apiLogout();
    //   history.push("/");
    // } catch (error) {
    //   alert(error.response.data);
    // }
  }, []);

  const onCloseMenu = useCallback(() => {
    setIsShowMenu(false);
  }, []);

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
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/friend" activeStyle={activeLinkStyle}>
              Friend
            </NavLink>
          </li>
        </NavCenterSection>

        {/* 우측영역 ( 설정 ) */}
        <NavRightSection>
          {user ? (
            <>
              <li>
                <NavLink to={`/profile/${user._id}`} activeStyle={activeLinkStyle}>
                  Profile
                </NavLink>
              </li>
              <li className="user__menu" onClick={onChangeShowMenu}>
                <Avartar src={user.Image.path} style={navAvarterStyle} />
                <b>{user.name}</b>
              </li>
              {isShowMenu && (
                <Menu onCloseMenu={onCloseMenu}>
                  <li>
                    <Avartar src={user.Image.path} style={menuAvarterStyle} />
                    <span>
                      <b>{user.name}</b>
                      <span>내 프로필 보기</span>
                    </span>
                  </li>
                  <li onClick={onClickLogout}>
                    <b>로그아웃</b>
                  </li>
                </Menu>
              )}
            </>
          ) : (
            <>
              <li>
                <NavLink to="/login" activeStyle={activeLinkStyle}>
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink to="/register" activeStyle={activeLinkStyle}>
                  Register
                </NavLink>
              </li>
            </>
          )}
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

export default withRouter(NavigationBar);
