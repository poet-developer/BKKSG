import React, {useState} from "react";
import styled, {ThemeProvider} from "styled-components";
import Logo from '../lib/Header_Logo'
import theme from '../lib/theme';
import { CgChevronRight, CgChevronLeft } from "react-icons/cg";

const HeaderGrid = styled.div`
     grid-area : header;
     z-index : 4;

`
const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const HeaderItem = styled.div`
  text-align: center;

  &: first-child {
    margin: 1rem;
    padding : 0.4rem 0 0 0;
    cursor: pointer;
    transform : scale(2.1);
    color: ${theme.colors.stroke};
  }
`;

const Glass = styled.div`
     padding : 0.2rem 0;
     width: 100%;
     position: fixed;
     top: 0;
     left: 0;    
     background: ${theme.gradient.radial};
     box-shadow: ${theme.glass.shadow};
     backdrop-filter: ${theme.glass.filter};
     -webkit-backdrop-filter: ${theme.glass.filter};
     border-radius: ${theme.glass.border.radius};
     border-bottom: ${theme.glass.border.line};
`;

const OpenSider = styled.div`
    position: fixed;
    left: 0;
    width: ${props => props.isOpen ? '10rem' : "3rem"};
    height: 120vh;
    opacity: 0.7;
    z-index: 5;
    cursor : pointer;
`

const getText = () => {
     return Math.floor(Math.random() * 3 + 1);
}

const Header = (props) => {
   //Hook

  const openSidebarHandler = (e) => {
    e.preventDefault();
    props.setIsOpen(!props.isOpen)
  }
     let textVersion = getText();
  return (
  <ThemeProvider theme={theme}>
    <HeaderGrid>
     <Glass>
      <HeaderContainer>
        <HeaderItem>
          {props.isOpen
          ? <CgChevronLeft/>
          :<CgChevronRight/>
          }
        </HeaderItem>
        <HeaderItem>
          <a href='/'>
          <Logo text = {textVersion} color ={theme.colors.stroke}/></a>
        </HeaderItem>
        <HeaderItem>
        </HeaderItem>
      </HeaderContainer>
      </Glass>
    </HeaderGrid>
      <OpenSider isOpen = {props.isOpen} onClick = {openSidebarHandler}>
      {/* blind Fixed HideSideBar  */}
      </OpenSider>
  </ThemeProvider>
  );
};

export default Header