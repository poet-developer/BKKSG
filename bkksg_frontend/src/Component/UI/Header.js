import React, {useState} from "react";
import styled, {ThemeProvider} from "styled-components";
import Logo from '../lib/Header_Logo'
import theme from '../lib/theme';
import Switch from "./Switch";
import getTheme from "../lib/getTheme";

const HeaderGrid = styled.div`
     grid-area : header;
     z-index : 3;
`
const HeaderContainer = styled.div`
display: flex;
justify-content: space-around;
`;

const Glass = styled.div`
     padding : 0.2rem 0;
     width: 100%;
     position: fixed;
     top: ${props => props.isModal ? "-60px" : "0"};
     left: 0;
     transition: 1s;
     background: ${props => props.theme.gradient.radial};
     -mos-box-shadow: ${props => props.theme.glass.shadow};
     -ms-box-shadow: ${props => props.theme.glass.shadow};
     -o-box-shadow: ${props => props.theme.glass.shadow};
     box-shadow:  ${props => props.theme.glass.shadow};
     backdrop-filter: ${props => props.theme.glass.filter};
     -webkit-backdrop-filter: ${props => props.theme.glass.filter};
     -mos-backdrop-filter: ${props => props.theme.glass.filter};
     -ms-backdrop-filter: ${props => props.theme.glass.filter};
     -o-backdrop-filter: ${props => props.theme.glass.filter};
     border-radius: ${props => props.theme.glass.border.radius};
     border-bottom: ${props => props.theme.glass.border.line};
`;



const getText = () => {
     return Math.floor(Math.random() * 3 + 1);
}


const Header = (props) => {
     let textVersion = getText();
     const [isChecked,setCheck] = useState(getTheme);
     const {isModal, themeHandler} = props;

  return (
    <ThemeProvider theme = {
      isChecked 
      ? theme.night
      : theme.day}
    >
    <HeaderGrid>
     <Glass isModal = {isModal}>
      <HeaderContainer>
        <div>
        </div>
        <div>
          <a href='/'>
          <Logo text = {textVersion} color ={"azure"}/></a>
        </div>
        <div>
          <Switch isChecked={isChecked} toggleHandler = {(e) => {
            setCheck(!isChecked);
            themeHandler(isChecked);
            if(isChecked) localStorage.setItem("Theme","day")
            else localStorage.setItem("Theme","night")
          }}/>
        </div>
      </HeaderContainer>
      </Glass>
    </HeaderGrid>
    </ThemeProvider>
  );
};

export default Header