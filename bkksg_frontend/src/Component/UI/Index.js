import React from 'react';
import styled from "styled-components";
import theme from '../lib/night';

const List = styled.ul`

      margin-top: 5rem;
      position: fixed;
      transition : 0.7s;
      left: 0;
      opacity : ${props => props.pullUp ? '1' : '0'};
      list-style-type : none;
      color: ${props => props.theme.colors.main};
      width: 100%;

      @media (max-width:281px){
        opacity : 0;
       };

      @media (min-width:${theme.screen.max}) {
          opacity : 1;
      };

`

const Anchor =  styled.a`
    display: flex;
    margin: 1rem -1.3rem;
    padding-left: 13%;
    width: 70%;
    height: 70px;
    color: ${props => props.theme.colors.main};
    text-decoration:none;
    border-radius : 0.3rem;
    font-family : WONBatang;

    &:hover {
      color: ${theme.colors.logo};
    }
  }
`

const EN_NAME = styled.span`
  font-size: 0.5rem;
  display: block;
  padding-top: 0.3rem;
`

const IndexList = (props) => {
  const names = ['시조각', '글조각', '조각조각', '프로젝트'];
  const paths = ['poem','essay','visual','project'];
  const en_names = ["SHI-JOGAK", "GEUL-JOGAK", "GEURIM-JOGAK", "JOGAK-JOGAK"]

  const nameList = names.map(name =>
  <li key = {names.indexOf(name)}><Anchor href ={'/'+paths[names.indexOf(name)]} theme = {props.theme}><h4>{name}<EN_NAME>{en_names[names.indexOf(name)]}</EN_NAME></h4></Anchor></li>);

  return <List pullUp = {props.pullUp}>{nameList}</List>;
};

export default IndexList

// onMouseOver={mouseOver()}