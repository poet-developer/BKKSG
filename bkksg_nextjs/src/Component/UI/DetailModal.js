import React, { useEffect } from "react"
import styled from "styled-components"
import theme from "../lib/theme"
import StopScroll from "../lib/StopScroll"
import DetailPage from "../page/DetailPage"
import { CgChevronLeft } from "react-icons/cg";

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
const ModalContainer = styled.div`

`
const DetailModal = props => {
  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
  const { open, close, data , themeMode } = props;
  useEffect(StopScroll,[]);

  return (
      <ModalContainer className={open ? "openModal modal" : "modal"}>
        {open ? (
          <section>
            <BackButton onClick={close}><CgChevronLeft /></BackButton>
            <DetailPage data={data}/>
          </section>
        ) : null}
      </ModalContainer>
  );
};

export default DetailModal
