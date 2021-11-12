import React, { useMemo } from "react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import styled from "styled-components";

// component
import Avartar from "../common/Avatar";
import Menu from "../common/Menu";

const Container = styled.section`
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

const NavRight = ({ user, isShowMenu, onChangeShowMenu, onClickLogout, onCloseMenu }) => {
  const activeLinkStyle = useMemo(() => ({ color: "#1977f1" }), []);
  const navAvarterStyle = useMemo(() => ({ width: "35px", height: "35px" }), []);
  const menuAvarterStyle = useMemo(() => ({ width: "50px", height: "50px" }), []);

  return (
    <Container>
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
            <Menu navMenu onCloseMenu={onCloseMenu}>
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
    </Container>
  );
};

NavRight.propTypes = {
  user: PropTypes.oneOfType([PropTypes.object]),
  isShowMenu: PropTypes.bool.isRequired,
  onChangeShowMenu: PropTypes.func.isRequired,
  onClickLogout: PropTypes.func.isRequired,
  onCloseMenu: PropTypes.func.isRequired,
};

export default NavRight;
