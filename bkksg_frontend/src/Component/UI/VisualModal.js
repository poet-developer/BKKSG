import React, {useEffect } from "react";
import "../../static/css/modal.css";
import '../../static/css/basicCss.css';
import styled, {ThemeProvider} from "styled-components";
import theme from '../lib/theme';

const ModalSection = styled.section`
  position: relative;
  max-height: 90vh;
  width: 90vw;
  border-radius: 1rem;
  margin-left: 1rem;
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
margin-bottom: -4rem;
color: ${theme.common.color};
background: ${props => props.theme === true ? theme.night.gradient.radial : theme.day.gradient.radial};
box-shadow: 0 8px 30px 0 rgba(31, 38, 135, 0.2);
backdrop-filter: blur( 3px );
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
  width: 100%;
  justify-content: center;
  margin-top: 3.1rem;
`

const Image = styled.img`
width: 100%;
flex: 0 1 auto;
`

const VisualModal = (props) => {
     // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴                                       
     const { open, close, header, data, themeMode } = props;
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
       <ThemeProvider theme={theme}>
       <div className={open ? 'openModal modal' : 'modal'}>
         {open ? (
           <ModalSection>
             <Header theme = {themeMode}>
               {header}
             </Header>
               <CancelButton className="close" onClick={close}>
                 &times;
               </CancelButton>
             <Main><Image src={`https://d2oispwivf10h4.cloudfront.net/w1024/${data}`}/></Main>
           </ModalSection>
         ) : null}
       </div>
       </ThemeProvider>
     );
   };

   export default VisualModal