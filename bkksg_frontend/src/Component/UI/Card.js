import React, { useState} from "react";
import styled, {ThemeProvider} from "styled-components";
import theme from '../lib/theme';
import DetailModal from './DetailModal';
import VisualModal from './VisualModal';
import ImageLoader from '../lib/imageLoader'
import '../../static/css/basicCss.css'

const CoverTextContent = styled.div`
     display: flex;
     position: relative;
     justify-content: center;
     align-items: center;
     width: 20rem;
     height: 7rem;
     border-radius: 1rem;
     background-color: ${props => props.theme.colors.card} !important;
     //버전만들기
     color: ${theme.common.color};
     cursor: pointer;

     &:hover{
          background-color: ${props => props.theme.colors.hover} !important;
     }
     
`

const CoverImgContent = styled.div`
     display: flex;
     position: relative;
     justify-content: center;
     align-items: center;
     width: 20rem;
     height: ${props => props.topic === 'project' ? '20rem' : ''};
     color: ${theme.common.color};
     cursor: pointer;
     margin-left: 0;
     margin-right: 1rem;
     border-radius: 1rem;
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
     background-color: rgba(0,0,0,0.3) !important;
     border-radius: 1rem;

     &:hover{
     background-color: rgba(0,0,0,0.1) !important;
     }
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
     padding-top: 0.1rem;
     font-size: 1rem;
     color: ${props => props.theme.colors.topic};
`

const windowClickCloseModal = (e, cb) =>{
     if(e.target.classList[0] === 'openModal'){
          cb();
     }
}

const Card = (props) => {

const { data, mode, modalHandler, themeMode } = props;
const [modalOpen, setModalOpen] = useState(false);
const [visualModal, setvisualOpen] = useState(false);
const [title, targetTitle] = useState(data.title);
const [desc, targetDesc] = useState('');
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
  modalHandler(true);
};

const openVisualModal = (e) => {
     setvisualOpen(true);
     targetTitle(data.title);
     targetDesc(data.desc);
     modalHandler(true);
   };

const closeModal = (e) => {
  setModalOpen(false);
  setvisualOpen(false);
  modalHandler(false);
};


window.addEventListener('click',(e)=>{
     windowClickCloseModal(e, closeModal);
});
// Close Modal by clicking window.

  return (
    <ThemeProvider theme={
         themeMode
         ? theme.night
         : theme.day }>
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
                  }><ImageLoader imageUrl={`https://d2oispwivf10h4.cloudfront.net/w330/${data.src}`}/>
                  <ImgLabel><CardTitle>{title}<Topic>{_topic}</Topic></CardTitle></ImgLabel></CoverImgContent>
             }
          { modalOpen
               ? <DetailModal themeMode = {themeMode} open= {modalOpen} close={closeModal} header={title} topic={data.topic}
               src = {data.src}>
                    <section dangerouslySetInnerHTML={{__html: desc }}></section>
               </DetailModal>
               :''
          }

          { visualModal
               ? <VisualModal themeMode = {themeMode} open={visualModal} close={closeModal} header={title} data = {data.src}>
                    <article>
                    <ImageLoader imageUrl={`https://d2oispwivf10h4.cloudfront.net/w330/${data.src}`}/>
                    </article>
               </VisualModal>
               :''
          }
    </ThemeProvider>
  );
};

export default Card