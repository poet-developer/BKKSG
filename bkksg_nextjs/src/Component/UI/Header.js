import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Logo from "../lib/Header_Logo";
import Switch from "./Switch";
import getTheme from "../lib/getTheme";
import LocalStorage from "../lib/LocalStorage";
import getRandomNum from "../lib/getRandomNum";
import { BiSearch } from "react-icons/bi";
import DetailModal from "./SearchModal";
import { StopScroll, EnableScroll } from "../lib/Scroll";
import Link from "next/link";

const Glass = styled.div`
  top: ${(props) => (props.isDetail ? "-70px" : "0")};
  background: ${(props) => props.theme.gradient.radial};
  -mos-box-shadow: ${(props) => props.theme.glass.shadow};
  -ms-box-shadow: ${(props) => props.theme.glass.shadow};
  -o-box-shadow: ${(props) => props.theme.glass.shadow};
  box-shadow: ${(props) => props.theme.glass.shadow};
  backdrop-filter: ${(props) => props.theme.glass.filter};
  -webkit-backdrop-filter: ${(props) => props.theme.glass.filter};
  -mos-backdrop-filter: ${(props) => props.theme.glass.filter};
  -ms-backdrop-filter: ${(props) => props.theme.glass.filter};
  -o-backdrop-filter: ${(props) => props.theme.glass.filter};
  border-radius: ${(props) => props.theme.glass.border.radius};
  border-bottom: ${(props) => props.theme.glass.border.line};
`;

const Search = styled.a`
  &:hover {
    opacity: 1;
  }
  @media (max-width: 500px) {
    left: 2.8rem;
    top: 1.8rem;
    margin-left: 0.5rem;
    width: 20px;
  }
`;
const windowClickCloseModal = (e, cb) => {
  if (e.target.classList[0] === "openModal") cb();
};

const Header = (props) => {
  let textVersion = getRandomNum(3);
  const [isChecked, setCheck] = useState(getTheme);
  const [modalOpen, setModalOpen] = useState(false);
  const { themeMode, isDetail, themeHandler } = props;

  useEffect(() => {
    if (isChecked === undefined) setCheck(themeMode);
    else setCheck(themeMode);
  }, []);

  const openModal = () => {
    setModalOpen(true);
    StopScroll();
  };

  const closeModal = () => {
    setModalOpen(false);
    EnableScroll();
  };

  window.addEventListener("click", (e) => {
    windowClickCloseModal(e, closeModal);
  });

  return (
    <div className="grid-item-header">
      <Glass className="header-glass" isDetail={isDetail}>
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <div></div>
          <div>
            <Link href="/">
              <a>
                <Logo text={textVersion} />
              </a>
            </Link>
          </div>
          <Search
            className="header-search-icon"
            onClick={openModal}
            // href="/search"
          >
            <BiSearch />
          </Search>
          <Switch
            themeMode={themeMode}
            isChecked={isChecked}
            toggleHandler={() => {
              setCheck(!isChecked);
              themeHandler(isChecked);
              if (isChecked) LocalStorage.setItem("Theme", "day");
              else LocalStorage.setItem("Theme", "night");
            }}
          />
        </div>
      </Glass>

      {modalOpen ? (
        <DetailModal themeMode={themeMode} open={modalOpen} close={closeModal}>
          <section dangerouslySetInnerHTML={{ __html: "4" }}></section>
        </DetailModal>
      ) : (
        ""
      )}
    </div>
  );
};

export default Header;
