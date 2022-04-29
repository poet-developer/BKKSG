import React, {useRef, useEffect} from "react";
import styled, {ThemeProvider} from "styled-components";
import theme from '../lib/theme';
import drawSolarSystemAnimation from  '../lib/SolarSystem'

const ModalSection = styled.section`
  position: relative;
  max-height: 100%;
  max-width: 100%;
  margin-left: 1rem;
  border-radius: 1rem;

  /* 팝업이 열릴때 스르륵 열리는 효과 */
  animation: modal-show 0.3s;
  
  box-shadow: 0 8px 30px 0 rgba(31, 38, 135, 0.2);
  backdrop-filter: blur( 8px );

  @media(max-width: 900px){
    overflow: hidden;
    overflow-y: scroll;
    overflow-x: scroll;
  }
`

const CancelButton = styled.button`
  cursor: pointer;
  position: absolute;
  top: 2rem;
  left: 2rem;
  border: 0;
  font-size: 40px;
  font-weight: 200;
  color: ${theme.common.color};
  background-color: transparent;
`



const CanvasAni = (props) => {
     let canvasRef = useRef();
     let canvas;
     let ctx;
     const {themeMode, open, close} = props;
     console.log(window.innerWidth);
     
     const checkWidth = () => {
      const canvas = {
        big: {x: 900, y: 700, ratio: 55},
        normal : {x: 600, y: 400, ratio: 45},
      }
      if(window.innerWidth >900){
        return canvas.big
      }else if(window.innerWidth > 700){
        return canvas.normal
      }

     }

     const drawLogo = () => {
          //canvas
          drawSolarSystemAnimation(canvas, ctx, 55)
          // requestAnimationFrame(drawLogo); 
     };
     
     useEffect(() => {
          canvas = canvasRef.current;
          ctx = canvas.getContext("2d");
          requestAnimationFrame(()=>{
            drawLogo()
          }); 

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
          <ThemeProvider theme = {themeMode ? theme.night : theme.day}>
       <div className={open ? 'openModal modal' : 'modal'}>
         {open ? 
           <ModalSection>
                <canvas style = {{backgroundColor:"rgba(10,10,60,0.2", borderRadius :"1rem", marginBottom: "-0.4rem"}} color = {props.color} ref = {canvasRef} width="900" height="800"></canvas>
               <CancelButton className="close" onClick={close}>
                 &times;
               </CancelButton>
           </ModalSection>
          : null}
       </div>
       </ThemeProvider>
     )

}

export default CanvasAni