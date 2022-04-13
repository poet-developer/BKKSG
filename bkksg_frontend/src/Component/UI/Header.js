import React, {useState} from "react";
import styled, {ThemeProvider} from "styled-components";
import Logo from '../lib/Header_Logo'
import theme from '../lib/night';
import Switch from "./Switch";
import getTheme from "../lib/getTheme"

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
     let textVersion = getText();
     const [isChecked,setCheck] = useState(getTheme);
     const {themeHandler} = props;
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
          <Switch isChecked={isChecked} toggleHandler = {function(e){
            setCheck(!isChecked);
            themeHandler(isChecked);
            console.log('체크박스',isChecked);
            if(isChecked){
              localStorage.setItem("Theme","day");
            }else{
              localStorage.setItem("Theme","night");
            }
          }}/>
        </HeaderItem>
      </HeaderContainer>
      </Glass>
    </HeaderGrid>
  </ThemeProvider>
  );
};

export default Header