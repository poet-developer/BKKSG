import React, { useState, useEffect } from "react";
import styled from "styled-components";
import theme from "../lib/theme";
import Logo from "../lib/Header_Logo";
import { FiInstagram } from "react-icons/fi";
import { FaPinterest } from "react-icons/fa";
import { GrTwitter } from "react-icons/gr";
import Image from 'next/image';
import opensea from'../../img/opensea.png';

const FooterBtnGrid = styled.footer`
  grid-area: footerBtn;
  bottom: ${props => (props.pullUp ? "11.6rem" : "-3.3rem")};
  background: ${props => props.theme.gradient.radial};
  box-shadow: ${props => props.theme.glass.shadow};
  backdrop-filter: ${props => props.theme.glass.filter};
  -webkit-backdrop-filter: ${props => props.theme.glass.border.line};
  border-radius: ${props => props.theme.glass.border.radius};

  .contact {
    color: ${theme.common.little};
    &:hover {
      color: ${theme.common.color};
    }
  }
`;

const FooterCotainer = styled.div`
  grid-area: footer;
  bottom: ${props => (props.pullUp ? "0" : "-15rem")};
  background: ${props => props.theme.gradient.footer};
  box-shadow: ${props => props.theme.glass.shadow};
  backdrop-filter: ${props => props.theme.glass.filter};
  -webkit-backdrop-filter: ${props => props.theme.glass.border.line};
  border-radius: ${props => props.theme.glass.border.radius};
  border-top: ${props => props.theme.glass.border.line};
`;

const ArtistList = styled.ul`
  .artist-part {
    flex: 1 0 150px;
    color: ${theme.common.color};
  }
  .artist-role {
    margin: -0.5rem 0;
    color: ${theme.common.color};
  }
`;

const LogoContainer = styled.div`
  .icon-item {
    &: hover{
      opacity: 1;
    }
  }

`;


const windowClickCloseModal = (e, cb) => {
  if (e.target.classList[0] === "openModal") cb()
};

const Footer = props => {
  const [isOpen, setIsOpen] = useState(false) //Sidebar Hook
  const [modalOpen, setModalOpen] = useState(false)
  const openFooterHandler = e => {
    e.preventDefault()
    setIsOpen(!isOpen)
  };

  const openModal = () => {
    setModalOpen(true)
  };

  const closeModal = () => {
    setModalOpen(false)
  };
  
  useEffect(()=>{
    window.addEventListener("click", e => {
      windowClickCloseModal(e, closeModal);
    })
    window.addEventListener("scroll", function () {
      let scrollLimitValue =
        window.pageYOffset + window.innerHeight > window.innerHeight * 2.7
      if (scrollLimitValue) setIsOpen(true)
      setIsOpen(false);
    });
  },[])

  

  return (
      <>
      <FooterBtnGrid
        className="footer-btn-grid"
        onClick={openFooterHandler}
        pullUp={isOpen ? true : false}
      >
      <div className = 'contact'>CONTACT</div>
      </FooterBtnGrid>
      ?{" "}
      <FooterCotainer className="footer-container" pullUp={isOpen ? true : false}>
        {/* 로고 */}
        <span style={{display: "none"}}>비껴서서 생각하고 설계하고 만드는 林이로의 움직이는 화랑| Poet, Essay, Art, Visual, Installation, Project</span>
        <LogoContainer className="footer-logo-container">
          <div style={{ marginLeft:'0.5rem'}} onClick={openModal}>
            <Logo/>
          </div>
          <hr style={{ border: "0.1px solid white", marginTop: "1rem" }} />
          <div className = "sns-icon">
            <a className = "icon-item"
              href="https://www.instagram.com/bkksgstudio/"
              target="_blank" rel="noopener noreferrer"
            >
              <FiInstagram size={36} />
            </a>
            <a className = "icon-item"
              href="https://twitter.com/bkksgstudio/"
              target="_blank" rel="noopener noreferrer"
            >
            <GrTwitter size={36} />
            </a>
            <a className = "icon-item"
              href="https://www.pinterest.co.kr/bkksgstudio/bkksg_assets/"
              target="_blank" rel="noopener noreferrer"
            >
              <FaPinterest size={35} />
            </a>
            <a className = "icon-item"
              href="https://opensea.io/collection/bkksg"
              target="_blank" rel="noopener noreferrer"
            >
              <Image alt="Opensea" layout="fixed" width={35} height={35} src={opensea}/>
            </a>
            <div className="contact-email" style = {{ color: theme.common.color}}>
              <h5 style={{ marginBottom: "0.5rem" }}>| CONTACT US</h5>
              <span style={{letterSpacing : "0.10rem", fontSize: "0.8rem"}}>bkksg.studio@gmail.com</span>
            </div>
          </div>
        </LogoContainer>
        <section></section>
        <ArtistList className="artist-ls">
          <nav className = "artist-part">
            <h4 className = "artist-role">| TECH</h4>
            <br />
            <li>poetDeveloper</li>
          </nav>
          <nav className = "artist-part">
            <h4 className = "artist-role">| CONTENT</h4>
            <br />
            <li>
            <span style={{ fontFamily: "KoreanMain" }}>이로</span> | IRO
            </li>
          </nav>
        </ArtistList>

        <div className="footer-copyright">@ 2022 Copyright All Rights Reserved By IROLIM</div>
      </FooterCotainer>
    </>
  );
};

export default Footer
