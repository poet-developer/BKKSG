import React, { useRef, useEffect } from "react";
import styled, { ThemeProvider } from "styled-components";
import theme from "../lib/theme";
import drawSolarSystemAnimation from "../lib/SolarSystem";
import StopScroll from "../lib/StopScroll"

const ModalSection = styled.section`
  position: relative;
  max-height: 100%;
  max-width: 100%;
  margin-left: 1rem;
  border-radius: 1rem;

  animation: modal-show 0.3s;
  box-shadow: 0 8px 30px 0 rgba(31, 38, 135, 0.2);
  backdrop-filter: blur(8px);

  @media (max-width: 850px) {
    overflow: hidden;
    overflow-y: scroll;
    overflow-x: scroll;
  }
`;

const CancelButton = styled.button`
  cursor: pointer;
  position: absolute;
  top: 1rem;
  left: 1rem;
  border: 0;
  font-size: 40px;
  font-weight: 200;
  color: ${theme.common.color};
  background-color: transparent;
`;
const checkWidth = () => {
  const canvas = {
    bigger: { x: 900, y: 850, orbitRatio: 55, planetRatio: 28 },
    big : { x: 750, y: 700, orbitRatio: 53, planetRatio: 25 },
    normal: { x: 600, y: 450, orbitRatio: 39, planetRatio: 20 },
    small: { x: 400, y: 350, orbitRatio: 22, planetRatio: 10 },
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
  const { themeMode, open, close } = props;

  let canvasInfo = checkWidth();

  const drawLogo = () => {
    //canvas
    drawSolarSystemAnimation(canvas, ctx, canvasInfo.orbitRatio, canvasInfo.planetRatio);
  };

   useEffect(() => {
    canvas = canvasRef.current;
    ctx = canvas.getContext("2d");
    requestAnimationFrame(drawLogo)
    StopScroll();
  }, []);

  return (
    <ThemeProvider theme={themeMode ? theme.night : theme.day}>
      <div className={open ? "openModal modal" : "modal"}>
        {open ? (
          <ModalSection>
            <canvas
              style={{
                backgroundColor: "rgba(10,10,60,0.2",
                borderRadius: "1rem",
                marginBottom: "-0.2rem",
              }}
              color={props.color}
              ref={canvasRef}
              width={canvasInfo.x}
              height={canvasInfo.y}
            ></canvas>
            <CancelButton className="close" onClick={close}>
              &times;
            </CancelButton>
          </ModalSection>
        ) : null}
      </div>
    </ThemeProvider>
  );
};

export default CanvasAni
