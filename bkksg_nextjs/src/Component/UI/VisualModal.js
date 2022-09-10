import React, { useEffect } from "react";
import styled from "styled-components";
import theme from "../lib/theme";
import StopScroll from "../lib/StopScroll"
import VisualPage from "../page/VisualPage"
import { CgChevronLeft } from "react-icons/cg";


const Header = styled.header`
  color: ${theme.common.color};
  height: 1.5rem;
  position: sticky;
  font-size: 1.3rem;
  `;

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

const VisualModal = props => {
  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
  const { open, close, data } = props;
  useEffect(StopScroll,[]);

  return (
    // 모달이 열릴때 openModal 클래스가 생성된다.
      <div className={open ? "openModal modal" : "modal"}>
        {open ? (
          <div style={{position:'absolute', left:'0', top:'0'}}>
             <BackButton onClick={close}><CgChevronLeft /></BackButton>
           <VisualPage data={data}/>
           </div>
        ) : null}
      </div>
  );
};

export default VisualModal;
