import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ImageLoader from "../lib/imageLoader";
import { useRouter } from 'next/router'

const CoverTextContent = styled.div`
  height: 7rem;
  background-color: ${props => props.theme.colors.card} !important;
  &:hover {
    background-color: ${props => props.theme.colors.hover} !important;
  }
`
const CoverImgContent = styled.div`
  height: ${props => (props.topic === "project" ? "20rem" : "auto")};
`

const Label = styled.div`
  position: absolute;
  left: 0;
  width: 4rem;
  height: 7rem;
  border-top-left-radius: 1rem;
  border-bottom-left-radius: 1rem;
  background-color: ${props => props.color} !important;
`

const ImgLabel = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3) !important;
  border-radius: 1rem;
  &:hover {
    background-color: rgba(0, 0, 0, 0.1) !important;
  }
`
const CardTitle = styled.div`
  position: absolute;
  padding-top: 0.5rem;
  right: 3rem;
  width: 11rem;
  line-height: 1.5rem;
  text-align: right;
  font-size: 1.2rem;
  font-family: WONBatang;
  color: azure;
`
const Topic = styled.div`
  padding-top: 0.3rem;
  font-size: 1rem;
  color: ${props => props.theme.colors.topic};
`

const windowClickCloseModal = (e, cb) => {
  if (e.target.classList[0] === "openModal") cb();
};

const Card = props => {
  const { data, mode, detailHandler, modalHandler, themeMode, infiniteCount } = props;
  const [modalOpen, setModalOpen] = useState(false);
  const [visualModal, setVisualOpen] = useState(false);
  let _topic;
  const router = useRouter();
  const isServer = typeof window === "undefined";

  if (data) 
    if (data.topic === "poem") _topic = "시조각"
    else if (data.topic === "essay") _topic = "글조각"
    else if (data.topic === "visual") _topic = "조각조각"
    else _topic = "프로젝트"

  const savePos = () => {
    if (isServer) return;
  //서버면 종료
    
    let pageYOffset = window.pageYOffset;
  // 페이지 오프셋
    return pageYOffset
  }  
  const openDetail = () => {
    let _path = `/${data.topic}/${String(data.id)}?sp=${savePos()}&cc=${infiniteCount}&fr=${mode}` //RememberScroll(포지션, count)
    router.push(_path)
  };

  const closeModal = () => {
    setModalOpen(false)
    setVisualOpen(false)
    detailHandler(false)
  };

  useEffect(()=>{
    console.log('현재모드',mode)
  },[])

  return (
    <>
      {data.topic === "poem" || data.topic === "essay" ? (
        <CoverTextContent className ="cover-content" mode={mode} onClick={openDetail}>
          <Label color={data.src}></Label>
          <CardTitle>
            {data.title}
            <Topic>{_topic}</Topic>
          </CardTitle>
        </CoverTextContent>
      ) : (
        <CoverImgContent
          className = "cover-content"
          topic={data.topic}
          mode={mode}
          onClick={openDetail}
        >
          <ImageLoader
            imageUrl={`https://d2oispwivf10h4.cloudfront.net/w330/${data.src}`} alt = {data.title}
          />
          <ImgLabel>
            <CardTitle>
              {data.title}
              <Topic>{_topic}</Topic>
            </CardTitle>
          </ImgLabel>
        </CoverImgContent>
      )}
    </>
  );
};

export default Card
