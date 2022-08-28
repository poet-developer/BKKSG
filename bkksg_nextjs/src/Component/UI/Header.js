import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Logo from "../lib/Header_Logo";
import Switch from "./Switch";
import getTheme from "../lib/getTheme";
import LocalStorage from "../lib/LocalStorage";

const Glass = styled.div`
  padding: 0.2rem 0;
  width: 100%;
  position: fixed;
  left: 0;
  transition: 1s;
  top: ${props => props.isModal ? "-70px" : "0"};
  background: ${props => props.theme.gradient.radial};
  -mos-box-shadow: ${props => props.theme.glass.shadow};
  -ms-box-shadow: ${props => props.theme.glass.shadow};
  -o-box-shadow: ${props => props.theme.glass.shadow};
  box-shadow: ${props => props.theme.glass.shadow};
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
};

const Header = props => {
  let textVersion = getText();
  const [isChecked, setCheck] = useState(getTheme);
  const { themeMode, isModal, themeHandler } = props;

  useEffect(() => {
    if( isChecked === undefined){
        setCheck(themeMode)
    }else{
      setCheck(themeMode)
    }
  },[]);

  return (
      <div className = "grid-item-header">
        <Glass isModal={isModal}>
          <div style = {{ display: 'flex', justifyContent: 'space-around' }}>
            <div></div>
            <div>
              <a href="/"><Logo text={textVersion}/></a>
            </div>
              <Switch
                themeMode = {themeMode}
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
      </div>
  );
};

export default Header;
