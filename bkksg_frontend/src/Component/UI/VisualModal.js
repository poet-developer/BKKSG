import React, {useEffect } from "react";
import "../../static/css/modal.css";
import "../../static/css/visualModal.css";
import '../../static/css/basicCss.css';
import styled, {ThemeProvider} from "styled-components";
import theme from '../lib/night';

const ModalSection = styled.section`
  position: relative;
  width: 80vw;
  max-width: 90vw;
  max-height: 80vh;
  margin: 0 auto;
  margin-left: 13%;
  border-radius: 1rem;
  background: rgba(255,255,255,0.5);

  /* 팝업이 열릴때 스르륵 열리는 효과 */
  animation: modal-show 0.3s;
  overflow: hidden;
  overflow-y: scroll;
  box-shadow: 0 8px 30px 0 rgba(31, 38, 135, 0.2);
  backdrop-filter: blur( 8px );
`
const Header = styled.header`
  position: absolute;
  width: 100%;
  padding: 16px 64px 16px 20px;
  font-weight: 700;
  font-size: 25px;
  border-radius: 0.5rem;
  background: linear-gradient(69deg, rgba(217, 230, 238, 0.7) 0%, rgba(177, 230, 219, 0.6) 68%, rgba(226,220,185,0) 91%);
  box-shadow: 0 8px 30px 0 rgba(31, 38, 135, 0.2);
  backdrop-filter: blur( 3px );

`

const CancelButton = styled.button`
  outline: none;
  cursor: pointer;
  position: sticky;
  border: 0;
  top: 10px;
  left: 73vw;
  width: 50px;
  font-size: 40px;
  font-weight: 200;
  text-align: center;
  color: rgb(192, 192, 192);
  background-color: transparent;
`

const FooterTag = styled.span`
  padding: 6px 12px;
  bottom: 0;
  color: #fff;
  background-color:lightslategray;
  border-radius: 5px;
  font-size: 13px;
`

const VisualModal = (props) => {
     // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴                                       
     const { open, close, header, writer } = props;
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
             <Header>
               {header}
              <span> by.{writer}</span>
             </Header>
               <CancelButton className="close" onClick={close}>
                 &times;
               </CancelButton>
             <main>{props.children}</main>
             <footer>
                 <FooterTag>by.{writer}</FooterTag>
             </footer>
           </ModalSection>
         ) : null}
       </div>
       </ThemeProvider>
     );
   };

   export default VisualModal