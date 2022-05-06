import React, { useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import theme from "../lib/theme";
import DetailModal from "./DetailModal";
import VisualModal from "./VisualModal";
import ImageLoader from "../lib/imageLoader";
import "../../static/css/basicCss.css";
import "../../static/css/gridSystem.css";

const CoverTextContent = styled.div`
  height: 7.5rem;
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
  height: 7.5rem;
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
  width: 9rem;
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
  const { data, mode, modalHandler, themeMode } = props;
  const [modalOpen, setModalOpen] = useState(false);
  const [visualModal, setvisualOpen] = useState(false);
  const [title, targetTitle] = useState(data.title);
  const [desc, targetDesc] = useState("");
  let _topic;

  if (data) 
    if (data.topic === "poem") _topic = "시조각"
    else if (data.topic === "essay") _topic = "글조각"
    else if (data.topic === "visual") _topic = "조각조각"
    else _topic = "프로젝트"

  const openModal = () => {
    setModalOpen(true)
    targetTitle(data.title)
    targetDesc(data.desc)
    modalHandler(true)
  };

  const openVisualModal = () => {
    setvisualOpen(true)
    targetTitle(data.title)
    targetDesc(data.desc)
    modalHandler(true)
  };

  const closeModal = () => {
    setModalOpen(false)
    setvisualOpen(false)
    modalHandler(false)
  };

  window.addEventListener("click", e => {
    windowClickCloseModal(e, closeModal)
  });
  // Close Modal by clicking window.

  return (
    <ThemeProvider theme={themeMode ? theme.night : theme.day}>
      {data.topic === "poem" || data.topic === "essay" ? (
        <CoverTextContent className ="cover-content" mode={mode} onClick={openModal}>
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
          onClick={ data.topic === "visual" ? openVisualModal : openModal
          }
        >
          <ImageLoader
            imageUrl={`https://d2oispwivf10h4.cloudfront.net/w330/${data.src}`}
          />
          <ImgLabel>
            <CardTitle>
              {title}
              <Topic>{_topic}</Topic>
            </CardTitle>
          </ImgLabel>
        </CoverImgContent>
      )}
      {modalOpen ? (
        <DetailModal
          themeMode={themeMode}
          open={modalOpen}
          close={closeModal}
          header={title}
          topic={data.topic}
          src={data.src}
        >
          <section dangerouslySetInnerHTML={{ __html: desc }}></section>
        </DetailModal>
      ) : (
        ""
      )}

      {visualModal ? (
        <VisualModal
          themeMode={themeMode}
          open={visualModal}
          close={closeModal}
          header={title}
          data={data.src}
        >
          <article>
            <ImageLoader
              imageUrl={`https://d2oispwivf10h4.cloudfront.net/w330/${data.src}`}
            />
          </article>
        </VisualModal>
      ) : (
        ""
      )}
    </ThemeProvider>
  );
};

export default Card
