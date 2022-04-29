import React, {useRef, useEffect} from "react";
import {cometOrbit, makeComet} from './drawLogo';
import styled from "styled-components";
import '../../static/css/basicCss.css'

const LogoContainer = styled.div`
     position : relative;
     width: 200px;
     height: 60px;
     margin-left: -0.5rem;
`;

// Logo animation

const Title = styled.div`
position: absolute;
left : 108px;
top: 19px;
font-family : ${props => props.text === 2? 'EnglishMain': 'WONBatang'};
font-weight: bolder;
font-size : ${props => props.text === 2? '18px': '17px'};

letter-spacing : 3px;
word-spacing : -7px;
color : ${props => props.color};
padding-left : ${props => props.text === 2? '1px': ''}
`;
//TITLE TEXT


function HeaderLogo(props) {
     let canvasRef = useRef();
     let canvas;
     let ctx;
     let _text;
     if(props.text){
          if(props.text === 1) _text = '비껴서기'
          else if(props.text === 2) _text = 'B KK SG'
          else _text = 'ㅂㄲㅅㄱ'
     }
     //캔버스

     const drawLogo = () => {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          //canvas
          cometOrbit(ctx, props.color); //orbit
          makeComet(ctx, props.color); 
          // animation
          requestAnimationFrame(drawLogo); 
     };
     
     useEffect(() => {
          canvas = canvasRef.current;
          ctx = canvas.getContext("2d");
          requestAnimationFrame(drawLogo); 
     },[]);

     return (
          <LogoContainer>
               <canvas color = {props.color} ref = {canvasRef} width="200" height="60"></canvas>
               <Title text = {props.text} color = {props.color}>{_text}</Title>
          </LogoContainer>
     )
}

export default HeaderLogo