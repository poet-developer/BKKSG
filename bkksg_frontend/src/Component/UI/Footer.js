import React, { useState } from "react";
import styled, {themeProvider} from "styled-components";
import night from '../lib/night';
import '../../static/css/basicCss.css'
import { ReactComponent as Logo } from '../../static/img/LOGO_BKKSG.svg';
import { FaInstagram } from 'react-icons/fa';
import { FaPinterest } from 'react-icons/fa';



const FooterBtnGrid = styled.footer`
    grid-area : footerBtn;
    position: fixed;
    bottom: ${props => props.pullUp ? '11.6rem' : "-3.3rem"};
    left: calc(50% - 1rem);
    height: 5rem;
    width: 5rem;
    border-left: 60px solid transparent;
    border-right: 60px solid transparent;

    transform: rotate(45deg);
    
    z-index: 2;
    border: none;

    transition: 1s;

    background: ${night.gradient.radial}; 
    box-shadow: ${night.glass.shadow};
    backdrop-filter:  ${night.glass.filter};
    -webkit-backdrop-filter:  ${night.glass.border.line};
    border-radius:  ${night.glass.border.radius};
    
`

const Contact = styled.div`
          position: relative;
          left: -1rem;
          top: -1rem;
          line-height: 5rem;
          font-size: 0.8rem;
          font-weight: bold;
          text-align: center;
          transform: rotate(-45deg);
          color: ${night.colors.logo};
          cursor : pointer;
          
`


const FooterCotainer = styled.div`
    grid-area : footer;
    position: fixed;
    left: -0.1rem;
    padding: 1rem 5rem;
    bottom: ${props => props.pullUp ? '0' : "-15rem"};
    width: 100%;
    height: 12.5rem;
    display: grid;
    grid-template-columns: 120px 1fr 1fr;
  
    gap: 2rem;
    z-index: 3;
    transition: 1s;
    background: ${night.gradient.footer}; 
    box-shadow: ${night.glass.shadow};
    backdrop-filter:  ${night.glass.filter};/
    -webkit-backdrop-filter:  ${night.glass.border.line};
    border-radius:  ${night.glass.border.radius};
`

const ArtistList = styled.ul`
  list-style-type : none;
  margin: 3rem 0;
  padding-right: 3rem;
  display: flex;
`

const Part = styled.nav`
  flex: 1 1 150px;   
  color: ${night.colors.main};
`
const D = styled.h4`
  margin: -0.5rem 0; 
  color: ${night.colors.main};
`

const LogoContainer = styled.div`
  position: relative;
  min-width: 230px;
  padding-top: 2.7rem;
`

const Title = styled.div`
position: absolute;
left : 130px;
top: 62px;
font-family : WONBatang;
font-weight: bolder;
font-size : 17px;

letter-spacing : 3px;
word-spacing : -7px;
color : ${night.colors.logo};
`;

const SNSLabel = styled.div`
position: absolute;
display: flex;
justify-content: space-between;
top: 60%;
width: 100%;
height: 65px;
background-color: rgba(255,255,255,0.3);
`
const ICONBOX = styled.div`
display: flex;
display: -webkit-box; 
display: -ms-flexbox; 
justify-content: flex-end;
padding-right: 13.%;
margin: 1rem;
`
const ICON = styled.a` 
flex: 0 0 10px;
margin: 1rem 0.5rem;
color: ${night.colors.logo};
cursorL pointer;
`

const Copyright = styled.div`
position: absolute;
bottom: 4px;
right: 13%;
text-align: end;
font-size : 11px;
color : ${night.colors.logo};
`

const MAIL = styled.div`
display: flex;
flex-direction: column;
gap:1rem;
margin: 1rem 5rem;
color: ${night.colors.logo};
`



const pullUpFooter = (cb) => {
    window.addEventListener('scroll',function(){
      let scrollLimitValue = (window.pageYOffset+window.innerHeight)>window.innerHeight*2.7;
      if(scrollLimitValue){
        cb(true);
      }else{
        cb(false);
      }
  });
   //Promise
};

const Footer = (props) => {
  const [isOpen, setIsOpen] = useState(false) //Sidebar Hook
  const [footerOpen, scrollEnd] = useState(false);
  const openFooterHandler = (e) => {
    e.preventDefault();
    setIsOpen(!isOpen)
  }

  pullUpFooter(setIsOpen);

  return (
    <themeProvider theme={night}>
             <FooterBtnGrid onClick={openFooterHandler} pullUp ={isOpen || footerOpen ? true : false}>
                <Contact>CONTACT</Contact>
            </FooterBtnGrid>
            ? <FooterCotainer  pullUp ={isOpen || footerOpen ? true : false}>
              {/* 로고 */}
            <LogoContainer><Logo color= {night.colors.logo} fill={night.colors.logo} stroke={night.colors.logo}/><Title>비 껴 서 기</Title></LogoContainer>
            <section></section>
            <ArtistList>
                <Part><D>| TECH</D><br/>
                <li>poetDeveloper</li>
                </Part>
                <Part><D>| CONTENT</D><br/>
                <li>IROLIM : 林이로</li></Part>
            </ArtistList>
            <SNSLabel><MAIL><D>| CONTACT US</D>&nbsp;&nbsp;bkksg@gmail.com</MAIL><ICONBOX><ICON href ="/"><FaInstagram size={36}/></ICON><ICON href ="https://www.pinterest.co.kr/" target="_blank"><FaPinterest size={35}/></ICON></ICONBOX></SNSLabel>
            <Copyright>@ Copyright All Rights Reserved</Copyright>
            </FooterCotainer>
    </themeProvider>
  );
};

export default Footer