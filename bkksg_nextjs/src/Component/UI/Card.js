import React from "react";
import { useRouter } from 'next/router'
import styled from "styled-components";
import ImageLoader from "../lib/imageLoader";

const CoverTextContent = styled.div`
  background-color: ${props => props.theme.colors.card} !important;
  &:hover {
    background-color: ${props => props.theme.colors.hover} !important;
  }
`
const CoverImgContent = styled.div`
  height: ${props => (props.topic === "project" ? "20rem" : "auto")};
`

const DetailLabel = styled.div`
  background-color: ${props => props.color} !important;
`

const VisualLabel = styled.div`
  &:hover {
    background-color: rgba(0, 0, 0, 0.1) !important;
  }
`
const Topic = styled.div`
  color: ${props => props.theme.colors.topic};
`

const Card = props => {
  const { data, mode, infiniteCount } = props;
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
    router.push(_path,`/${data.topic}/${String(data.id)}`)
  };

  return (
    <>
      {data.topic === "poem" || data.topic === "essay" ? (
        <CoverTextContent className ="cover-content" mode={mode} onClick={openDetail}>
          <DetailLabel className="detail-label" color={data.cover_src}></DetailLabel>
          <div className="card-title">
            {data.title}
            <Topic className="card-topic">{_topic}</Topic>
          </div>
        </CoverTextContent>
      ) : (
        <CoverImgContent
          className = "cover-content"
          topic={data.topic}
          mode={mode}
          onClick={openDetail}
        >
          <ImageLoader
            imageUrl={`${process.env.NEXT_PUBLIC_REACT_AWS_CLOUDFRONT}w330/${data.cover_src}`} alt = {data.title}/>
          <VisualLabel className="visual-label">
            <div className="card-title">
              {data.title}
              <Topic className="card-topic">{_topic}</Topic>
            </div>
          </VisualLabel>
        </CoverImgContent>
      )}
    </>
  );
};

export default Card
