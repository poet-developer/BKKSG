import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import theme from "../lib/theme";
import drawSolarSystemAnimation from "../lib/SolarSystem";
import { CgChevronLeft } from "react-icons/cg";
import { useRouter } from 'next/router'
import getRandomNum from '../lib/getRandomNum'

const Bo = styled.div`
  width: 100vw;
  height: 110vh;
  background-image: url('/jogakbo/${getRandomNum(10)}.jpg');
  backrgound-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1.5rem;

  animation: modal-show 0.3s;
  @media (max-width: 850px) {
    overflow: hidden;
    overflow-y: scroll;
    overflow-x: scroll;
  }
`

const Cutton = styled.div`
 position: absolute;
 top:0;
 left:0;
 height: 111vh;
 width: 100vw;
 padding: 1rem;
 background: rgba(10,10,10,0.3);
`

const BackButton = styled.div`
  position: fixed;
  left: 1.5rem;
  top: 2.2rem;
  transform: scale(2);
  color: azure;
  cursor: pointer;
  z-index: 9;
  opacity: 0.8;

  &:hover{
    opacity: 1;
  }
`

const checkWidth = () => {
  const canvas = {
    bigger: { x: 900, y: 900, orbitRatio: 65, planetRatio: 32 },
    big : { x: 750, y: 750, orbitRatio: 53, planetRatio: 25 },
    normal: { x: 600, y: 600, orbitRatio: 39, planetRatio: 20 },
    small: { x: 430, y: 430, orbitRatio: 28, planetRatio: 17 },
  };
  if (window.innerWidth >= 850)
    return canvas.bigger
  else if (window.innerWidth >=700 && window.innerWidth < 850)
    return canvas.big
  else if (window.innerWidth < 700 && window.innerWidth >= 450)
    return canvas.normal
  else if (window.innerWidth < 450)
    return canvas.small
};

const CanvasAni = props => {
  let canvasRef = useRef();
  let canvas;
  let ctx;
  const { themeMode, detailHandler } = props;
  const router = useRouter()

  let canvasInfo = checkWidth();
  const goBack = (e)=>{
    try {
    if (e) router.push('/')
    }catch(err){
      throw new Error("Failed to Go Back.")
    }
  }

  const drawLogo = () => {
    //canvas
    drawSolarSystemAnimation(canvas, ctx, canvasInfo.orbitRatio, canvasInfo.planetRatio);
  };

   useEffect(() => {
    canvas = canvasRef.current;
    ctx = canvas.getContext("2d");
    requestAnimationFrame(drawLogo)
    detailHandler(true);
  }, []);

  return (
      <Bo>
        <BackButton onClick={goBack}><CgChevronLeft /></BackButton>
        <Cutton/>
            <canvas
              style={{zIndex: '3', display: 'relative'}}
              color={props.color}
              ref={canvasRef}
              width={canvasInfo.x}
              height={canvasInfo.y}
              >
              </canvas>
      </Bo>
  );
};

export default CanvasAni
