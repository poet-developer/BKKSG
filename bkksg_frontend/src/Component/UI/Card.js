import React, { useState, useEffect } from "react";
import styled, {ThemeProvider} from "styled-components";
import theme from '../lib/theme';
import DetailModal from './DetailModal';
import VisualModal from './VisualModal';
import '../../static/css/basicCss.css'

const CoverTextContent = styled.div`
     display: flex;
     position: relative;
     justify-content: center;
     align-items: center;
     min-width: 20rem;
     width: ${props => props.mode === 'home' ? '20rem' : '20rem'};
     height: ${props => props.mode === 'home' ? '7rem' : '7rem'};
     border-radius: 1rem;
     background-color: ${props => props.color} !important;
     color: ${theme.colors.logo};
     cursor: pointer;
     margin-right: 1rem;
`

const CoverImgContent = styled.figure`
     display: flex;
     position: relative;
     justify-content: center;
     align-items: center;
     min-width: 20rem;
     height: ${props => props.topic === 'project' ? '20rem' : ''};
     color: ${theme.colors.logo};
     cursor: pointer;
     margin-left: 0;
`

const Section = styled.section`
     margin: 3rem;
`

const CardTitle = styled.div`
     position: absolute;
     right: 3rem;
     text-align: right;
     font-size: 1.2rem;
     font-family : WONBatang;
`
const Topic = styled.div`
     font-size: 1rem;
`
const Project = styled.img`
     object-fit: cover;
     width: 100%;
     height: 100%;
     border-radius: 1rem;
     margin-bottom: 1rem;
`

const Visual = styled.img`
     object-fit: cover;
     width: 100%;
     height: 100%;
     border-radius: 1rem;
     margin-bottom: 1rem;
`

const Card = (props) => {

const { data, mode } = props;
const [modalOpen, setModalOpen] = useState(false);
const [visualModal, setvisualOpen] = useState(false);
const [title, targetTitle] = useState(data.title);
const [desc, targetDesc] = useState('');
const [writer, targetWriter] = useState('');

const openModal = (e) => {
  setModalOpen(true);
  targetTitle(data.title);
  targetDesc(data.desc);
  targetWriter(data.nickname);
};

const openVisualModal = (e) => {
     setvisualOpen(true);
     targetTitle(data.title);
     targetDesc(data.desc);
     targetWriter(data.nickname);
   };

const closeModal = (e) => {
  setModalOpen(false);
  setvisualOpen(false);
};

useEffect(()=>{
     console.log(data.desc);
},[])

  return (
    <ThemeProvider theme={theme}>
             {data.topic === 'poem' || data.topic === 'essay'
             ? <CoverTextContent mode = {mode} onClick = {openModal} color = {data.src}><CardTitle>{data.title}<Topic>{data.topic}</Topic></CardTitle></CoverTextContent>
             : <CoverImgContent topic = {data.topic} mode = {mode} onClick = {
                  (e) => {
                       if(data.topic === 'visual'){
                         openVisualModal();
                       }else{
                         openModal();
                       }
                  }
                  }><Project src={'/images/covers/'+data.src}/>
                  <CardTitle>{title}<Topic>{data.topic}</Topic></CardTitle></CoverImgContent>
             }
          { modalOpen
               ? <DetailModal open={modalOpen} close={closeModal} header={title} writer = {writer}>
                    <article>
                    <Section dangerouslySetInnerHTML={{__html: desc }}></Section>
                    </article>
               </DetailModal>
               :''
          }

          { visualModal
               ? <VisualModal open={visualModal} close={closeModal} header={title} writer = {writer} data = {data.src}>
                    <article>
                    <Visual src={'/images/covers/'+data.src}/>
                    </article>
               </VisualModal>
               :''
          }
    </ThemeProvider>
  );
};

export default Card