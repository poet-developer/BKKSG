import React, { useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import theme from "../lib/theme";
import IndexList from "./IndexList";
import { CgChevronRight, CgChevronLeft } from "react-icons/cg";
import "../../static/css/gridSystem.css";

const SidebarGrid = styled.div`
  background: ${props => props.theme.gradient.linear};
  -mos-box-shadow: ${props => props.theme.glass.shadow};
  -ms-box-shadow: ${props => props.theme.glass.shadow};
  -o-box-shadow: ${props => props.theme.glass.shadow};
  box-shadow: ${props => props.theme.glass.shadow};

  -mos-backdrop-filter: ${props => props.theme.glass.filter};
  -ms-backdrop-filter: ${props => props.theme.glass.filter};
  -o-backdrop-filter: ${props => props.theme.glass.filter};
  -webkit-backdrop-filter: ${props => props.theme.glass.filter};
  backdrop-filter: ${props => props.theme.glass.filter};

  border-radius: ${props => props.theme.glass.border.radius};
  border-right: ${props => props.theme.glass.border.line};
  cursor: pointer;
  left: ${props => (props.pullUp ? "0" : "-8rem")};
  @media (max-width: 200px) {
    left: -8rem;
  };
  @media (min-width: ${theme.common.screen.max}) {
    left: ${props => (props.pullUp ? "-8rem" : "0" || "0")};
  };

  -webkit-overflow-scrolling: touch;
`;

const OpenSideButton = styled.div`
  position: absolute;
  left: 7rem;
  top: 50%;
  opacity: 0.7;
  z-index: 20;
  cursor: pointer;
  margin: 1rem;
  padding: 0.4rem 0 0 0;
  cursor: pointer;
  transform: scale(2);
  color: ${theme.common.little};
  &:hover {
    color: ${theme.common.color};
  }
`;

const Sidebar = props => {
  const [isPullup, setPullup] = useState(false)
  const { themeMode } = props
  const openSidebarHandler = () => {
    setPullup(!isPullup)
  };
  const resizeHandler = () => {
    setPullup(false)
  };
  window.addEventListener("resize", resizeHandler)

  return (
    <ThemeProvider theme={themeMode ? theme.night : theme.day}>
      <SidebarGrid
        className="grid-item-sidebar"
        onClick={openSidebarHandler}
        pullUp={isPullup}
      >
        <IndexList
          themeMode={themeMode}
          pullUp={isPullup}
          style={{ position: "relative" }}
        ></IndexList>
        <OpenSideButton pullUp={isPullup}>
          {isPullup || window.innerWidth < theme.common.screen.max ? (
            <CgChevronLeft />
          ) : (
            <CgChevronRight />
          )}
        </OpenSideButton>
      </SidebarGrid>
    </ThemeProvider>
  );
};

export default Sidebar
