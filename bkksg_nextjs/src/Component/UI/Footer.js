import React, { useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import theme from "../lib/theme";
import "../../static/css/basicCss.css";
import { ReactComponent as Logo } from "../../static/img/LOGO_BKKSG.svg";
import { FiInstagram } from "react-icons/fi";
import { FaPinterest } from "react-icons/fa";
import CanvasAni from "./CanvasAni";

const FooterBtnGrid = styled.footer`
  grid-area: footerBtn;
  position: fixed;
  bottom: ${props => (props.pullUp ? "11.6rem" : "-3.3rem")};
  left: calc(50% - 2rem);
  height: 5rem;
  width: 5rem;
  border-left: 60px solid transparent;
  border-right: 60px solid transparent;

  transform: rotate(45deg);

  z-index: 2;
  border: none;

  transition: 0.7s;

  background: ${props => props.theme.gradient.radial};
  box-shadow: ${props => props.theme.glass.shadow};
  backdrop-filter: ${props => props.theme.glass.filter};
  -webkit-backdrop-filter: ${props => props.theme.glass.border.line};
  border-radius: ${props => props.theme.glass.border.radius};

  .contact {
    position: relative;
    left: -1rem;
    top: -1rem;
    line-height: 5rem;
    font-size: 0.8rem;

    font-family: EnglishMain;
    font-weight: bold;
    text-align: center;
    transform: rotate(-45deg);
    cursor: pointer;
    color: ${theme.common.little};
    &:hover {
      color: ${theme.common.color};
    }
  }
`;

const FooterCotainer = styled.div`
  grid-area: footer;
  position: fixed;
  left: -0.1rem;
  padding: 1rem 1rem;
  bottom: ${props => (props.pullUp ? "0" : "-15rem")};
  width: 100%;
  height: 12.5rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  font-family: EnglishMain, KoreanMain;

  gap: 2rem;
  z-index: 3;
  transition: 0.7s;
  background: ${props => props.theme.gradient.footer};
  box-shadow: ${props => props.theme.glass.shadow};
  backdrop-filter: ${props => props.theme.glass.filter};
  -webkit-backdrop-filter: ${props => props.theme.glass.border.line};
  border-radius: ${props => props.theme.glass.border.radius};
  border-top: ${props => props.theme.glass.border.line};
`;

const ArtistList = styled.ul`
  list-style-type: none;
  padding-top: 2.1rem;
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  align-items: center;
  min-width: 30%;

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
  flex: 0 1 120px;
  margin-left: 1.5rem;
  position: relative;
  min-width: 230px;
  padding-top: 2.7rem;

  .logo-title {
    position: absolute;
    left: 130px;
    top: 62px;
    font-family: WONBatang;
    font-weight: bolder;
    font-size: 17px;

    letter-spacing: 3px;
    word-spacing: -7px;
    color: ${theme.common.color};
  }

  .sns-icon {
    display: flex;
    gap: 1rem;
    padding: 0.7rem 0;

    .icon-item {
      color: ${theme.common.color};
      cursor: pointer;
  }
  }
`;

const Copyright = styled.div`
  position: absolute;
  bottom: 0px;
  right: 2.5rem;
  text-align: end;
  font-size: 11px;
  color: ${theme.common.color};
`;


const pullUpFooter = cb => {
  window.addEventListener("scroll", function () {
    // let scrollLimitValue =
    //   window.pageYOffset + window.innerHeight > window.innerHeight * 2.7
    // if (scrollLimitValue) cb(true)
    cb(false);
  });
  //Promise
};

const windowClickCloseModal = (e, cb) => {
  if (e.target.classList[0] === "openModal") cb()
};

const Footer = props => {
  const [isOpen, setIsOpen] = useState(false) //Sidebar Hook
  const [modalOpen, setModalOpen] = useState(false)
  const { themeMode } = props
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

  pullUpFooter(setIsOpen)

  window.addEventListener("click", e => {
    windowClickCloseModal(e, closeModal);
  })

  return (
    <ThemeProvider theme={themeMode ? theme.night : theme.day}>
      <FooterBtnGrid
        onClick={openFooterHandler}
        pullUp={isOpen ? true : false}
      >
        <div className = 'contact'>CONTACT</div>
      </FooterBtnGrid>
      ?{" "}
      <FooterCotainer pullUp={isOpen ? true : false}>
        {/* 로고 */}
        <span style={{display: "none"}}>비껴서서 생각하고 설계하고 만드는 林이로의 움직이는 화랑| Poet, Essay, Art, Visual, Installation, Project</span>
        <LogoContainer>
          <div style={{ cursor: "pointer" }} onClick={openModal}>
            <Logo
              color={theme.common.color}
              fill={theme.common.color}
              stroke={theme.common.color}
            />
            <div className = "logo-title">비 껴 서 기</div>
          </div>
          <hr style={{ border: "0.1px solid white", marginTop: "1rem" }} />
          <div className = "sns-icon">
            <a className = "icon-item"
              href="https://www.instagram.com/bkksg.studio/"
              target="_blank" rel="noopener noreferrer"
            >
              <FiInstagram size={36} />
            </a>
            <a className = "icon-item"
              href="https://www.pinterest.co.kr/bkksgstudio/bkksg_assets/"
              target="_blank" rel="noopener noreferrer"
            >
              <FaPinterest size={35} />
            </a>
            <div style = {{ color: theme.common.color}}>
              <h5 style={{ marginBottom: "0.5rem" }}>| CONTACT US</h5>
              <span style={{letterSpacing : "0.15rem", fontSize: "0.9rem"}}>bkksg.studio@gmail.com</span>
            </div>
          </div>
        </LogoContainer>
        <section></section>
        <ArtistList>
          <nav className = "artist-part">
            <h4 className = "artist-role">| TECH</h4>
            <br />
            <li>poetDeveloper</li>
          </nav>
          <nav className = "artist-part">
            <h4 className = "artist-role">| CONTENT</h4>
            <br />
            <li>
            <span style={{ fontFamily: "KoreanMain" }}>林이로</span> | IROLIM
            </li>
          </nav>
        </ArtistList>

        <Copyright>@ 2022 Copyright All Rights Reserved By IROLIM</Copyright>
      </FooterCotainer>
      {modalOpen ? (
        <CanvasAni
          themeMode={themeMode}
          open={modalOpen}
          close={closeModal}
        ></CanvasAni>
      ) : (
        ""
      )}
    </ThemeProvider>
  );
};

export default Footer
