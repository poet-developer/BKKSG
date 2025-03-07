import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import drawSolarSystemAnimation from "../lib/SolarSystem";
import { CgChevronLeft } from "react-icons/cg";
import { useRouter } from "next/router";
import getRandomNum from "../lib/getRandomNum";

/**
 * for Html Canvas
 * 애니메이션이 움직일 전체 캔버스 크기를 설정한다.
 * 뒤로가기 버튼을 적용한다.
 *  Header, Sidebar는 사라진다.
 */
const Bo = styled.div`
  animation: modal-show 0.3s;
  background-image: url("/jogakbo/${getRandomNum(10)}.jpg");
  @media (max-width: 850px) {
    overflow: hidden;
    overflow-y: scroll;
    overflow-x: scroll;
  }
`;

const BackButton = styled.div`
  &:hover {
    opacity: 1;
  }
`;

const checkWidth = () => {
  // 모바일 환경을 확인해서 그에 맞는 애니메이션을 구성하기 위한 확인.
  const canvas = {
    bigger: { x: 900, y: 900, orbitRatio: 65, planetRatio: 32 },
    big: { x: 750, y: 750, orbitRatio: 53, planetRatio: 25 },
    normal: { x: 600, y: 600, orbitRatio: 39, planetRatio: 20 },
    small: { x: 430, y: 430, orbitRatio: 28, planetRatio: 17 },
  };
  if (window.innerWidth >= 850) return canvas.bigger;
  else if (window.innerWidth >= 700 && window.innerWidth < 850)
    return canvas.big;
  else if (window.innerWidth < 700 && window.innerWidth >= 450)
    return canvas.normal;
  else if (window.innerWidth < 450) return canvas.small;
};

const CanvasAni = ({ detailHandler, color }) => {
  let canvasRef = useRef(); // 다시 렌더링되지 않는 Layer.
  let canvas;
  let ctx;
  const router = useRouter();

  let canvasInfo = checkWidth();
  const goBack = (e) => {
    try {
      if (e) router.push("/");
    } catch (err) {
      throw new Error("Failed to Go Back.");
    }
  };

  const drawAnimation = () => {
    drawSolarSystemAnimation(
      canvas,
      ctx,
      canvasInfo.orbitRatio,
      canvasInfo.planetRatio,
    );
  }; // 애니메이션 그리는 함수 (../lib/SolarSystem)

  useEffect(() => {
    canvas = canvasRef.current;
    ctx = canvas.getContext("2d");
    requestAnimationFrame(drawAnimation); // 초당 60frame으로 재생 (callback)
    detailHandler(true); // Header & Sidbar 없애는 이벤트 함수
  }, []);

  return (
    <Bo className="bo-container">
      <BackButton className="bo-back-btn" onClick={goBack}>
        <CgChevronLeft />
      </BackButton>
      <canvas
        style={{ zIndex: "3", display: "relative" }}
        color={color}
        ref={canvasRef}
        width={canvasInfo.x}
        height={canvasInfo.y}
      ></canvas>
    </Bo>
  );
};

export default CanvasAni;
