import React, { useRef, useState } from "react";
import styled, {ThemeProvider} from "styled-components";
import theme from '../lib/theme';


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
    
    z-index: 3;
    border: none;

    transition: 1s;

    background: ${theme.gradient.radial}; 
    box-shadow: ${theme.glass.shadow};
    backdrop-filter:  ${theme.glass.filter};
    -webkit-backdrop-filter:  ${theme.glass.border.line};
    border-radius:  ${theme.glass.border.radius};
    
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
          color: ${theme.colors.logo};
          cursor : pointer;
          
`


const FooterCotainer = styled.div`
    grid-area : footer;
    position: fixed;
    left: -0.1rem;
    padding: 1rem 5rem;
    bottom: ${props => props.pullUp ? '0' : "-15rem"};
    width: 100%;
    height: 12rem;
    display: flex;
    
    justify-content: space-around;
    gap: 2rem;
    z-index: 3;
    transition: 1s;
    cursor: pointer;


    background: ${theme.gradient.footer}; 
    box-shadow: ${theme.glass.shadow};
    backdrop-filter:  ${theme.glass.filter};/
    -webkit-backdrop-filter:  ${theme.glass.border.line};
    border-radius:  ${theme.glass.border.radius};
`

const ArtistList = styled.ul`
  list-style-type : none;
  margin: 0 0 0 -4rem;
  
`

const Part = styled.nav`
  flex: 1 1 auto;   
  color: ${theme.colors.main};
`
const D = styled.h3`
  margin: 2rem 0 0 -1.5rem;  
  color: ${theme.colors.main};
`
const pullUpFooter = (cb) => {
    window.addEventListener('scroll',function(){
      let scrollLimitValue = (window.pageYOffset+window.innerHeight)>window.innerHeight*1.5;
      if(scrollLimitValue){
        cb(true);
      }else{
        cb(false);
      }
  }); //Promise
};

const Footer = (props) => {
  const [isOpen, setIsOpen] = useState(false) //Sidebar Hook
  const [footerOpen, scrollEnd] = useState(false);
  const openFooterHandler = (e) => {
    e.preventDefault();
    setIsOpen(!isOpen)
  }

  // pullUpFooter(scrollEnd);

  return (
    <ThemeProvider theme={theme}>
             <FooterBtnGrid onClick={openFooterHandler} pullUp ={isOpen || footerOpen ? true : false}>
                <Contact>CONTACT</Contact>
            </FooterBtnGrid>
            ? <FooterCotainer onClick={openFooterHandler}  pullUp ={isOpen || footerOpen ? true : false}>
              <Part><D>| 1D</D><br/>
                <ArtistList><li>| poetDeveloper : Full Stack Web Developer</li>
                </ArtistList>
                </Part>
                <Part><D>| 2D</D><br/>
                <ArtistList><li>| 林이로 / IROLIM : Poet & 2D Visual</li><br/><li>| Out.spider : Writer</li></ArtistList>
                </Part>
                <Part><D>| 3D & EXTRA</D><br/>
                <ArtistList><li>| 林이로 : 3D Visual</li></ArtistList></Part>
               </FooterCotainer>
    </ThemeProvider>
  );
};

export default Footer