import React, { useState } from "react";
import styled, {ThemeProvider} from "styled-components";
import theme from '../lib/theme';


const FooterBtnGrid = styled.footer`
    grid-area : footerBtn;
    position: fixed;
    bottom: ${props => props.pullUp ? '12rem' : "-2.6rem"};
    left: calc(50% - 2rem);
    height: 5rem;
    width: 5rem;
    border-left: 60px solid transparent;
    border-right: 60px solid transparent;

    transform: rotate(45deg);
    
    z-index: 2;
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
          left: -0.7rem;
          top: -0.7rem;
          line-height: 5rem;
          font-size: 0.8rem;
          font-weight: bold;
          text-align: center;
          transform: rotate(-45deg);
          color: ${theme.colors.stroke};
          cursor : pointer;
          
`


const FooterCotainer = styled.div`
     grid-area : footer;
     position: fixed;
     left: -0.1rem;
     padding: 1rem;
    bottom: ${props => props.pullUp ? '0' : "-15rem"};
    width: 100%;
    height: 12.6rem;

    z-index: 2;
    transition: 1s;
    cursor: pointer;

    background: ${theme.gradient.footer}; 
    box-shadow: ${theme.glass.shadow};
    backdrop-filter:  ${theme.glass.filter};/
    -webkit-backdrop-filter:  ${theme.glass.border.line};
    border-radius:  ${theme.glass.border.radius};
`

const Footer = () => {
  const [isOpen, setIsOpen] = useState(false) //Hook

  const openFooterHandler = (e) => {
    e.preventDefault();
    setIsOpen(!isOpen)
  }

  return (
    <ThemeProvider theme={theme}>
             <FooterBtnGrid onClick={openFooterHandler} pullUp ={isOpen ? true : false}>
                <Contact>CONTACT</Contact>
            </FooterBtnGrid>
            ? <FooterCotainer onClick={openFooterHandler}  pullUp ={isOpen ? true : false}>
                <nav><h2>| 1D</h2><br/>
                <ul><li>| poetDeveloper <p>: Full Stack Web Developer</p></li>
                </ul>
                </nav>
                <div><h2>| 2D</h2><br/>
                    <ul><li>| 林이로 / IROLIM<p>: Poet & 2D Visual</p></li><br/><li>| Out.spider <p>: Writer</p></li></ul>
               </div>
                <div><h2>| 3D & EXTRA</h2><br/><ul><li>| 林이로 <p>: 3D Visual</p></li></ul></div>
               </FooterCotainer>
    </ThemeProvider>
  );
};

export default Footer