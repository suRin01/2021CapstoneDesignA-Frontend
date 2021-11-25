import React, { useCallback } from "react";
import { withRouter } from "react-router-dom";
import styled from "styled-components";

// component
import NavLeft from "./NavLeft";
import NavCenter from "./NavCenter";
import NavRight from "./NavRight";
import HamburgerButton from "./HamburgerButton";

// 사용자 정의 hook
import useButton from "../../hooks/useButton";
import useUser from "../../hooks/useUser";

// api
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
  align-items: center; // 기존 baseline -> center로 변경.

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

const NavigationBar = ({ history }) => {
  const [user, setUser] = useUser();
  const [isShowLink, onChangeShowLink] = useButton(true);
  const [isShowMenu, onChangeShowMenu, setIsShowMenu] = useButton(false);

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
        <NavLeft />

        {/* 중간영역 ( 링크 ) */}
        <NavCenter />

        {/* 우측영역 ( 설정 ) */}
        <NavRight
          user={user}
          isShowMenu={isShowMenu}
          onChangeShowMenu={onChangeShowMenu}
          onClickLogout={onClickLogout}
          onCloseMenu={onCloseMenu}
        />

        {/* 햄버거 버튼 */}
        <HamburgerButton onChangeShowLink={onChangeShowLink} />
      </NavContainerStyle>
    </NavStyle>
  );
};

export default withRouter(NavigationBar);
