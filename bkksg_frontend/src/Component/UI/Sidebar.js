import React from "react";
import styled, {ThemeProvider} from "styled-components";
import theme from '../lib/theme';
import IndexList from './Index'
import { CgChevronRight, CgChevronLeft } from "react-icons/cg";

const SidebarGrid = styled.div`
     grid-area : sidebar;
     position: fixed;
     width: 9.3rem;
     top: 3rem;
     margin-top : -4rem;
     height: 100vh;
     z-index: 3;
     transition: 1s;
     background:  ${theme.gradient.linear} ;
     box-shadow:  ${theme.glass.shadow};
     backdrop-filter: ${theme.glass.filter};
     -webkit-backdrop-filter: ${theme.glass.filter};
     border-radius: ${theme.glass.border.radius};
     border-right:  ${theme.glass.border.line};
     cursor : pointer;
     left: ${props => props.pullUp ? '0' : "-8rem"};
     @media (max-width:281px){
       left: -8rem;
      };
    @media (min-width: ${theme.screen.max}) {
      left: 0;
    };
`

const OpenSideButton = styled.div`
    display : inline;
    position: fixed;
    right : -0.6rem;
    top: 50%;
    opacity: 0.7;
    z-index: 4;
    cursor : pointer;

    margin: 1rem;
    padding : 0.4rem 0 0 0;
    cursor: pointer;
    transform : scale(2);
    transition :1s;
    color: ${theme.colors.main};
`

const Sidebar = (props) => {
  const openSidebarHandler = (e) => {
    props.setIsOpen(!props.pullUp)
  }

  return (
       <ThemeProvider theme={theme}> 
        <SidebarGrid onClick = {openSidebarHandler} pullUp = {props.pullUp}>
        <IndexList pullUp = {props.pullUp}></IndexList>
        <OpenSideButton pullUp = {props.pullUp}>
            {props.pullUp || window.innerWidth< theme.screen.max 
            ? <CgChevronLeft/>
            :<CgChevronRight/>
            }
        </OpenSideButton>
          {/* // to be treated as a loop */}
      </SidebarGrid>
     </ThemeProvider>
  );
};

export default Sidebar