import React, { useState } from "react";
import styled, {ThemeProvider} from "styled-components";
import theme from '../lib/theme';
import '../../static/css/basicCss.css'
import { ReactComponent as Logo } from '../../static/img/LOGO_BKKSG.svg';
import { FiInstagram } from 'react-icons/fi';
import { FaPinterest } from 'react-icons/fa';
import CanvasAni from './CanvasAni';



const FooterBtnGrid = styled.footer`
    grid-area : footerBtn;
    position: fixed;
    bottom: ${props => props.pullUp ? '11.6rem' : "-3.3rem"};
    left: calc(50% - 2rem);
    height: 5rem;
    width: 5rem;
    border-left: 60px solid transparent;
    border-right: 60px solid transparent;

    transform: rotate(45deg);
    
    z-index: 2;
    border: none;

    transition: 1s;

    background: ${props => props.theme.gradient.radial}; 
    box-shadow: ${props => props.theme.glass.shadow};
    backdrop-filter:  ${props => props.theme.glass.filter};
    -webkit-backdrop-filter:  ${props => props.theme.glass.border.line};
    border-radius:  ${props => props.theme.glass.border.radius};
`

const Contact = styled.div`
          position: relative;
          left: -1rem;
          top: -1rem;
          line-height: 5rem;
          font-size: 0.8rem;

          font-family : EnglishMain;
          font-weight: bold;
          text-align: center;
          transform: rotate(-45deg);
          cursor : pointer;         
          color: ${theme.common.little};
          &:hover {
            color: ${theme.common.color};
          }
`

const FooterCotainer = styled.div`
    grid-area : footer;
    position: fixed;
    left: -0.1rem;
    padding: 1rem 1rem;
    bottom: ${props => props.pullUp ? '0' : "-15rem"};
    width: 100%;
    height: 12.5rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    font-family : EnglishMain, KoreanMain;
  
    gap: 2rem;
    z-index: 3;
    transition: 1s;
    background: ${props=> props.theme.gradient.footer }; 
    box-shadow: ${props=> props.theme.glass.shadow};
    backdrop-filter:  ${props=> props.theme.glass.filter};
    -webkit-backdrop-filter:  ${props=> props.theme.glass.border.line};
    border-radius:  ${props=> props.theme.glass.border.radius};
    border-top: ${props => props.theme.glass.border.line};
`

const ArtistList = styled.ul`
  list-style-type : none;
  padding-top: 2.1rem;
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  align-items: center;
  min-width: 30%;
`

const Part = styled.nav`
  flex: 1 0 150px;   
  color: ${theme.common.color};
`
const D = styled.h4`
  margin: -0.5rem 0; 
  color: ${theme.common.color};
`

const LogoContainer = styled.div`
  flex: 0 1 120px;
  margin-left: 1.5rem;
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
color : ${theme.common.color};
`;

const ICONBOX = styled.div`
display:flex;
gap: 1rem;
padding: 0.7rem 0;
`
const ICON = styled.a` 
color: ${theme.common.color};
cursor: pointer;
`

const Copyright = styled.div`
position: absolute;
bottom: 0px;
right: 2.5rem;
text-align: end;
font-size : 11px;
color : ${theme.common.color};
`

const MAIL = styled.div`
margin-top: -1.5rem;
color: ${theme.common.color};
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

const windowClickCloseModal = (e, cb) =>{
  if(e.target.classList[0] === 'openModal'){
       cb();
  }
}

const Footer = (props) => {
  const [isOpen, setIsOpen] = useState(false) //Sidebar Hook
  const [modalOpen, setModalOpen] = useState(false);
  const [footerOpen, scrollEnd] = useState(false);
  const { themeMode } = props;
  const openFooterHandler = (e) => {
    e.preventDefault();
    setIsOpen(!isOpen)
  }

  const openModal = (e) => {
    setModalOpen(true);
    // modalHandler(true);
  };
  
  const closeModal = (e) => {
    setModalOpen(false);
    // modalHandler(false);
  };

  const modalHandler =  (e) =>{
    openModal();
  }

  pullUpFooter(setIsOpen);

  window.addEventListener('click',(e)=>{
    windowClickCloseModal(e, closeModal);
});

  return (
            <ThemeProvider theme ={
              themeMode
              ? theme.night
              : theme.day
              }>
             <FooterBtnGrid onClick={openFooterHandler} pullUp ={isOpen || footerOpen ? true : false}>
                <Contact>CONTACT</Contact>
            </FooterBtnGrid>
            ? <FooterCotainer pullUp ={isOpen || footerOpen ? true : false}>
              {/* 로고 */}
            <LogoContainer><div style = {{cursor : "pointer",}} onClick = {modalHandler}><Logo color= {theme.common.color} fill={theme.common.color} stroke={theme.common.color}/><Title>비 껴 서 기</Title></div>
            <hr style={{border: "0.1px solid white", marginTop: "1rem"}}/>
            <ICONBOX><ICON href ="https://www.instagram.com/bkksg.studio/" target="_blank"><FiInstagram size={36}/></ICON><ICON href ="https://www.pinterest.co.kr/bkksgstudio/" target="_blank"><FaPinterest size={35}/></ICON><MAIL><h5 style={{marginBottom:"0.5rem"}}>| CONTACT US</h5><span>bkksg.studio@gmail.com</span></MAIL></ICONBOX></LogoContainer>
            <section></section>
            <ArtistList>
                <Part><D>| TECH</D><br/>
                <li>poetDeveloper</li>
                </Part>
                <Part><D>| CONTENT</D><br/>
                <li>IROLIM : <span style = {{fontFamily : "KoreanMain"}}>林이로</span></li></Part>
            </ArtistList>
            
            <Copyright>@ Copyright All Rights Reserved</Copyright>
            </FooterCotainer>

            { modalOpen
               ? <CanvasAni themeMode = {themeMode} open= {modalOpen} close={closeModal}>
               </CanvasAni>
               :''
          }

            </ThemeProvider>
  );
};

export default Footer