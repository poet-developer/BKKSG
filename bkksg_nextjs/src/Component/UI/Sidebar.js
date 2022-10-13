import React, { useState, useEffect } from "react";
import styled from "styled-components";
import theme from "../lib/theme";
import IndexList from "./IndexList";
import { CgChevronRight, CgChevronLeft } from "react-icons/cg";

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
  cursor: ${props=>(props.isDetail? 'default' : 'pointer')};
  left: ${props => (props.pullUp ? "0" : "-8rem")};
  @media (max-width: 200px) {
    left: -8rem;
  };
  @media (min-width: ${theme.common.screen.max}) {
    left: ${props => (props.pullUp ? "-8rem" : "0" || "0")};
  };
  opacity: ${props=>(props.isDetail? '0' : '1')};

`;

const OpenSideButton = styled.div`
  cursor: ${props=>(props.isDetail? 'default' : 'pointer')};
  color: ${theme.common.little};
  &:hover {
    color: ${theme.common.color};
  }
`;

const Sidebar = props => {
  const [isPullup, setPullup] = useState(false)
  const { themeMode, isDetail } = props
  const openSidebarHandler = () => {
    setPullup(!isPullup)
  };
  const resizeHandler = () => {
    setPullup(false)
  };
  let windowWidth;

  useEffect(()=>{
    window.addEventListener("resize", resizeHandler)
    windowWidth = window.innerWidth
  },[])
 
  return (
      <SidebarGrid
        className="grid-item-sidebar"
        onClick={openSidebarHandler}
        pullUp={isPullup}
        isDetail={isDetail}
      >
        <IndexList
          themeMode={themeMode}
          pullUp={isPullup}
          style={{ position: "relative" }}
        ></IndexList>
        <OpenSideButton className="open-side-button" pullUp={isPullup} isDetail={isDetail}>
          {isPullup || windowWidth < theme.common.screen.max ? (
            <CgChevronLeft />
          ) : (
            <CgChevronRight />
          )}
        </OpenSideButton>
      </SidebarGrid>
  );
};

export default Sidebar
