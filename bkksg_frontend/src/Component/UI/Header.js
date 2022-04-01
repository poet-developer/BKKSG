import React, {useState} from "react";
import styled, {ThemeProvider} from "styled-components";
import Logo from '../lib/Header_Logo'
import theme from '../lib/theme';

const HeaderGrid = styled.div`
     grid-area : header;
     z-index : 3;

`
const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const HeaderItem = styled.div`
  text-align: center;
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



const getText = () => {
     return Math.floor(Math.random() * 3 + 1);
}

const Header = (props) => {
   //Hook

  
     let textVersion = getText();
  return (
  <ThemeProvider theme={theme}>
    <HeaderGrid>
     <Glass>
      <HeaderContainer>
        <HeaderItem>
        </HeaderItem>
        <HeaderItem>
          <a href='/'>
          <Logo text = {textVersion} color ={theme.colors.logo}/></a>
        </HeaderItem>
        <HeaderItem>
        </HeaderItem>
      </HeaderContainer>
      </Glass>
    </HeaderGrid>
      
  </ThemeProvider>
  );
};

export default Header