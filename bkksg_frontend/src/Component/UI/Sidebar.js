import React , {useState} from "react";
import styled, {ThemeProvider} from "styled-components";
import theme from '../lib/theme';


const SidebarGrid = styled.div`
     grid-area : sidebar;
     position: fixed;
     width: 9rem;
     top: 4rem;
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
    @media (min-width:1000px) {
      left: 0;
    };
`

const List = styled.ul`
      margin-top: 6rem;
`

const Sidebar = (props) => {

  return (
       <ThemeProvider theme={theme}>
     <SidebarGrid pullUp = {props.pullUp}>
     <List>
         <li>글조각</li><li>그림조각</li><li>조각조각</li>
     </List>
     </SidebarGrid>
     </ThemeProvider>
  );
};

export default Sidebar