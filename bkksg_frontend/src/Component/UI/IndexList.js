import React from "react";
import styled, { ThemeProvider } from "styled-components";
import theme from "../lib/theme";
import "../../static/css/basicCss.css";

const List = styled.ul`
  margin-top: 7rem;
  transition: 2s;
  display: flex;
  justify-content: center;
  flex-direction: column;
  left: 0;
  opacity: ${props => (props.pullUp ? "1" : "0")};
  list-style-type: none;
  max-width: 8rem;
  @media (max-width: 281px) {
    opacity: 0;
  }
  @media (min-width: ${theme.common.screen.max}) {
    opacity: 1;
  } ;
  
`;

const Anchor = styled.a`
    display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: flex;

    margin: 2rem 0.5rem;
    padding-left: 21%;
    width: 70%;
    height: 20px;
    color: ${props => props.theme.colors.index};
    text-decoration: none;
    font-family : WONBatang;
    & : hover {
      color: ${theme.common.color};
    }
  }
`;

const EN_NAME = styled.span`
  font-family: EnglishMain;
  font-size: 0.6rem;
  display: block;
  padding-top: 0.5rem;

  & : hover {
    color: ${theme.common.logo};
  }
`;

const IndexList = props => {
  const names = [`모아보기`, "시조각", "글조각", "조각조각", "프로젝트"];
  const paths = ["", "poem", "essay", "visual", "project"];
  const en_names = [
    "HOME",
    "SHI-JOGAK",
    "GEUL-JOGAK",
    "GEURIM-JOGAK",
    "JOGAK-JOGAK",
  ];
  const { themeMode } = props;

  const nameList = names.map(name => (
    <li key={names.indexOf(name)}>
      <Anchor href={"/" + paths[names.indexOf(name)]}>
        <h4>
          {name}
          <EN_NAME>{en_names[names.indexOf(name)]}</EN_NAME>
        </h4>
      </Anchor>
    </li>
  ));

  return (
    <ThemeProvider theme={themeMode ? theme.night : theme.day}>
      <List pullUp={props.pullUp}>{nameList}</List>
    </ThemeProvider>
  );
};

export default IndexList
