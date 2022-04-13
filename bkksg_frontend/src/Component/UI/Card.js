import React, { useState} from "react";
import styled, {ThemeProvider} from "styled-components";
import theme from '../lib/night';
import DetailModal from './DetailModal';
import VisualModal from './VisualModal';
import '../../static/css/basicCss.css'

const CoverTextContent = styled.div`
     display: flex;
     position: relative;
     justify-content: center;
     align-items: center;
     width: 20rem;
     height: 7rem;
     border-radius: 1rem;
     background-color: rgba(255,255,255,0.3) !important;
     color: ${theme.colors.logo};
     cursor: pointer;
     margin-right: 1rem;
     
`

const CoverImgContent = styled.figure`
     display: flex;
     position: relative;
     justify-content: center;
     align-items: center;
     width: 20rem;
     height: ${props => props.topic === 'project' ? '20rem' : ''};
     color: ${theme.colors.logo};
     cursor: pointer;
     margin-left: 0;
     margin-right: 1rem;
`

const Section = styled.section`
     margin: 3rem;
`
const Label = styled.div`
position: absolute;
left: 0;
width: 4rem;
height: 7rem;
border-top-left-radius:     1rem;
border-bottom-left-radius:  1rem;
background-color: ${props => props.color} !important;
`

const ImgLabel = styled.div`
position: absolute;
display: flex;
align-items: center;
width: 100%;
height: 100%;
background-color: rgba(0,0,0,0.1) !important;
border-radius: 1rem;
`
const CardTitle = styled.div`
     position: absolute;
     right: 3rem;
     width: 10rem;
     text-align: right;
     font-size: 1.2rem;
     font-family : WONBatang;
`
const Topic = styled.div`
     font-size: 1rem;
     color: gold;
`
const Project = styled.img`
     object-fit: cover;
     width: 100%;
     height: 100%;
     border-radius: 1rem;
`

const Visual = styled.img`
     object-fit: cover;
     width: 100%;
     height: 100%;
     border-radius: 1rem;
     margin-bottom: 1rem;
`
const windowClickCloseModal = (e, cb) =>{
     if(e.target.classList[0] === 'openModal'){
          cb();
     }
}

const Card = (props) => {

const { data, mode } = props;
const [modalOpen, setModalOpen] = useState(false);
const [visualModal, setvisualOpen] = useState(false);
const [title, targetTitle] = useState(data.title);
const [desc, targetDesc] = useState('');
const [writer, targetWriter] = useState('');
let _topic;

if(data){
     if(data.topic === 'poem'){
          _topic = '시조각';
     }else if(data.topic === 'essay'){
          _topic = '글조각';
     }else if(data.topic === 'visual'){
          _topic = '조각조각';
     }else{
          _topic = '프로젝트';
     }
}

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


window.addEventListener('click',(e)=>{
     windowClickCloseModal(e, closeModal);
});
// Close Modal by clicking window.

  return (
    <ThemeProvider theme={theme}>
             {data.topic === 'poem' || data.topic === 'essay'
             ? <CoverTextContent mode = {mode} onClick = {openModal}><Label color = {data.src}></Label><CardTitle>{data.title}<Topic>{_topic}</Topic></CardTitle></CoverTextContent>
             : <CoverImgContent topic = {data.topic} mode = {mode} onClick = {
                  (e) => {
                       if(data.topic === 'visual'){
                         openVisualModal();
                       }else{
                         openModal();
                       }
                  }
                  }><Project src={'/images/covers/'+data.src}/>
                  <ImgLabel><CardTitle>{title}<Topic>{_topic}</Topic></CardTitle></ImgLabel></CoverImgContent>
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