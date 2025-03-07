import React from "react";
import styled from "styled-components";
import theme from "../lib/theme";

const List = styled.ul`
  opacity: ${(props) => (props.pullUp ? "1" : "0")};
  @media (max-width: 281px) {
    opacity: 0;
  }
  @media (min-width: ${theme.common.screen.max}) {
    opacity: 1;
  }
`;

const Anchor = styled.a`
    color: ${(props) => props.theme.colors.index};
    & : hover {
      color: ${theme.common.color};
    }
  }
`;

const EN_NAME = styled.span`
  &: hover {
    color: ${theme.common.logo};
  }
`;

const IndexList = (props) => {
  const names = [
    "자기소개",
    `모아보기`,
    "시조각",
    "글조각",
    "조각조각",
    "프로젝트",
    "조각보"
  ];
  const paths = ["about", "", "poem", "essay", "visual", "project", "jogakbo", ];
  const en_names = [
    "ABOUT",
    "HOME",
    "SHI-JOGAK",
    "GEUL-JOGAK",
    "JOGAK-JOGAK",
    "PROJECT",
    "JOGAK-BO"
  ];
  const nameList = names.map((name) => (
    <li key={names.indexOf(name)}>
      <Anchor className="index-anchor" href={"/" + paths[names.indexOf(name)]}>
        <h4>
          {name}
          <EN_NAME className="index-en">
            {en_names[names.indexOf(name)]}
          </EN_NAME>
        </h4>
      </Anchor>
    </li>
  ));

  return (
    <List className="index-ls" pullUp={props.pullUp}>
      {nameList}
    </List>
  );
};

export default IndexList;
