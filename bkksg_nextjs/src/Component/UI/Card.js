import React from "react";
import { useRouter } from 'next/router'
import styled from "styled-components";

/**
 * Content Thumbnail UI Design.
 * poem & essay (TextContent)와 visual & project (ImgContent)와 분기
 */

const Card = props => {
  const { data, mode, infiniteCount } = props;
  let _topic;
  const router = useRouter();
  const isServer = typeof window === "undefined";
    const styles = {
    borderRadius: "1rem",
    height: "100%",
    width: "100%",
    objectFit: "cover"
  };

  if (data) // 글 종류 한글 아웃풋
    if (data.topic === "poem") _topic = "시조각"
    else if (data.topic === "essay") _topic = "글조각"
    else if (data.topic === "visual") _topic = "조각조각"
    else _topic = "프로젝트"

  const savePos = () => {
    if (isServer) return;
  //서버면 종료
    let pageYOffset = window.pageYOffset;
  // scroll Y position
    return pageYOffset
  }  
  const openDetail = () => {
    let _path = `/${data.topic}/${String(data.id)}?sp=${savePos()}&cc=${infiniteCount}&fr=${mode}` 
    //Scroll(포지션, count)위치는 url을 통해 저장해서 데이터를 넘길것.
    router.push(_path,`/${data.topic}/${String(data.id)}`)
    // Detail Page View
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
        </CoverTextContent> // Poem & Essay
      ) : (
        <CoverImgContent
          className = "cover-content"
          topic={data.topic}
          mode={mode}
          onClick={openDetail}
        >
            <img
            style={styles}
            alt= {data.title}
            src={`${process.env.NEXT_PUBLIC_REACT_AWS_CLOUDFRONT}w330/${data.cover_src}`}
          />
          <VisualLabel className="visual-label">
            <div className="card-title">
              {data.title}
              <Topic className="card-topic">{_topic}</Topic>
            </div>
          </VisualLabel>
        </CoverImgContent> // Visual & Project
      )}
    </>
  );
};

const CoverTextContent = styled.div`
  background-color: ${props => props.theme.colors.card} !important;
  &:hover {
    background-color: ${props => props.theme.colors.hover} !important;
  }
`
//Poem & Essay Contnet
const CoverImgContent = styled.div`
  height: ${props => (props.topic === "project" ? "20rem" : "auto")};
`
//Visaul & Project Contnet

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
// 컨텐츠 종류


export default Card
