import React, {useEffect } from "react";
import "../../static/css/modal.css";
import '../../static/css/basicCss.css';
import styled, {ThemeProvider} from "styled-components";
import theme from '../lib/theme';

const ModalSection = styled.section`
  position: relative;
  max-height: 80vh;
  width: 90vw;
  margin-left: 1rem;
  border-radius: 1rem;

  /* 팝업이 열릴때 스르륵 열리는 효과 */
  animation: modal-show 0.3s;
  overflow: hidden;
  overflow-y: scroll;
  box-shadow: 0 8px 30px 0 rgba(31, 38, 135, 0.2);
  backdrop-filter: blur( 8px );
`
const Header = styled.header`
  position: sticky;
  z-index: -5;
  width: 100%;
  min-height: 30px;
  top: 0;
  padding: 16px 64px 30px 32px;
  font-weight: 700;
  font-size: 21px;
  border-radius: 0.5rem;
  margin-bottom: -4rem;
  background: ${props => props.color ? `linear-gradient(69deg, ${props.color} -60%, ${props.theme.colors.detailHeader.mid} 68%, ${props.theme.colors.detailHeader.end} 91%)` : theme.common.color};
  box-shadow: 0 8px 30px 0 rgba(31, 38, 135, 0.2);
  backdrop-filter: blur( 3px );
`

const HeaderInRoof = styled.div`
  position: absolute;
  top: 0;
  padding: 11rem 2.5rem;
  color: ${theme.common.color};
  width: 100%;
  margin-top: -3rem;
  background: linear-gradient(90deg, rgba(131,58,180,0.3) 0%, rgba(0,0,0,0.5) 0%, rgba(252,176,69,0) 70%);
`
const ImageRoof = styled.img`
  width: 100%;
  height: 130%;
  object-fit: cover;
`

const CancelButton = styled.button`
  cursor: pointer;
  position: sticky;
  top: 10px;
  right: 10px;
  float: right;
  border: 0;
  font-size: 40px;
  font-weight: 200;
  color: ${props => props.theme.colors.cancel };
  background-color: transparent;
`

const Main = styled.main`
  display: flex;
  justify-content: center;
  z-index: 2;
  min-height: 50vh;
  width: 90%;
  padding: 2.5rem 5vw;
  line-height: 35px;
  font-family: 'koreanMain';
  font-size: 18px;
  color: ${props => props.theme.colors.index };
  background: ${props => props.theme.colors.modal};
`

const DetailModal = (props) => {
     // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴                                       
     const { open, close, header, topic, src, themeMode} = props;
     useEffect(() => {
         document.body.style.cssText = `
         position: fixed; 
         top: -${window.scrollY}px;
         overflow-y: scroll;
         width: 100%;`;
       return () => {
         const scrollY = document.body.style.top;
         document.body.style.cssText = '';
         window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
         };
    }, []);
    
         return (
       // 모달이 열릴때 openModal 클래스가 생성된다.
       <ThemeProvider theme = {themeMode ? theme.night : theme.day}>
       <div className={open ? 'openModal modal' : 'modal'}>
         {open ? 
           <ModalSection>
                { topic === 'project'
                 ? <div style = {{ position: 'sticky', zIndex: '-5', top: '0', height:'15rem',
                 width: "100%"}}>
                   <ImageRoof src={`https://d2oispwivf10h4.cloudfront.net/w1024/${src}`}/>
                   <HeaderInRoof>
                     <h4 style = {{ maxWidth : '15rem', fontSize: '21px'}}>{header}</h4>
                     </HeaderInRoof>
                   </div>
                 : <Header color = {src}><div style = {{ maxWidth: '20rem', color: theme.common.color}}>{header}</div></Header>
               }
               <CancelButton className="close" onClick={close}>
                 &times;
               </CancelButton>
               <Main topic = {topic}>{props.children}</Main>
           </ModalSection>
          : null}
       </div>
       </ThemeProvider>
     );
   };

   export default DetailModal