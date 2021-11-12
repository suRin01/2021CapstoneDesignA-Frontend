import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

// 일반 메뉴
const MenuWrapper = styled.section`
  position: relative;

  .menu {
    position: absolute;
    top: 50px;
    left: 15px;
    padding: 0.3rem;
    border-radius: 10px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.4);
    background: #ffffff;
    transform: translateX(-50%);
    z-index: 1;

    button[type="button"] {
      white-space: nowrap;
      padding: 0.3rem 5rem;

      &:hover {
        background: rgba(0, 0, 0, 0.1);
        border-radius: 5px;
      }
    }
  }
`;

// 네비게이션 메뉴
const CreateNavMenu = styled.section`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: 1000;
`;
const NavMenuWrapper = styled.ul`
  position: absolute;
  top: 90px;
  right: 10px;

  border: 1px solid gray;
  border-radius: 6px;
  box-shadow: 0 0 10px gray;
  padding: 1rem;
  background: #ffffff;

  & > li {
    display: flex;
    align-items: center;
    padding: 1rem 1.5rem;
    border-radius: 5px;
    cursor: pointer;

    & > span {
      display: flex;
      flex-direction: column;

      & > span {
        color: gray;
      }
    }
  }

  & > li:hover {
    background-color: #e0e0e0;
  }
`;

const MenuComponent = {
  Menu: React.forwardRef(function Menu({ children }, ref) {
    return (
      <MenuWrapper ref={ref}>
        <aside className="menu">{children}</aside>
      </MenuWrapper>
    );
  }),
  NavMenu: function NavMenu({ children, onCloseMenu }) {
    return (
      <CreateNavMenu onClick={onCloseMenu}>
        <NavMenuWrapper>{children}</NavMenuWrapper>
      </CreateNavMenu>
    );
  },
};

const Menu = React.forwardRef((props, ref) => {
  const { menu, navMenu } = props;

  if (menu) {
    return (
      <MenuComponent.Menu {...props} ref={ref}>
        {props.children}
      </MenuComponent.Menu>
    );
  }

  if (navMenu) {
    return <MenuComponent.NavMenu {...props}>{props.children}</MenuComponent.NavMenu>;
  }

  return <h1>메뉴 잘못 지정했음</h1>;
});

MenuComponent.NavMenu.propTypes = {
  children: PropTypes.node.isRequired,
  onCloseMenu: PropTypes.func.isRequired,
};
MenuComponent.Menu.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Menu;
