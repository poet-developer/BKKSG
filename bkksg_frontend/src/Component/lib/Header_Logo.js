import React, { useRef, useEffect } from "react";
import { cometOrbit, makeComet } from "./drawLogo";
import styled from "styled-components";
import "../../static/css/basicCss.css";

const LogoContainer = styled.div`
  position: relative;
  width: 200px;
  height: 60px;
  margin-left: -0.5rem;
`;
// Logo animation
const Title = styled.div`
  position: absolute;
  left: 108px;
  top: 21px;
  font-family: ${props => props.text === 2 ? "EnglishMain" : "WONBatang"};
  font-weight: bolder;
  font-size: ${props => props.text === 2 ? "18px" : "17px"};

  letter-spacing: 3px;
  word-spacing: -7px;
  color: azure;
  padding-left: ${props => props.text === 2 ? "1px" : ""};
`;
//TITLE TEXT

const HeaderLogo = props => {
  let canvasRef = useRef();
  let canvas, ctx, _text;
  if (props.text) {
    if (props.text === 1) _text = "비껴서기"
    else if (props.text === 2) _text = "B KK SG"
    else _text = "ㅂㄲㅅㄱ"
  }

  const drawLogo = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    cometOrbit(ctx, "azure");
    makeComet(ctx, "azure");
    requestAnimationFrame(drawLogo);
  };

  useEffect(() => {
    canvas = canvasRef.current;
    ctx = canvas.getContext("2d");
    requestAnimationFrame(drawLogo);
  }, []);

  return (
    <LogoContainer>
      <canvas
        ref={canvasRef}
        width="200"
        height="60"
      ></canvas>
      <Title text={props.text}>
        {_text}
      </Title>
    </LogoContainer>
  );
}

export default HeaderLogo;
