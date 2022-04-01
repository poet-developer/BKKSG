import React, {useEffect } from "react";
import "../../static/css/modal.css";
import "../../static/css/visualModal.css";
import '../../static/css/basicCss.css';

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
       <div className={open ? 'openModal modal' : 'modal'}>
         {open ? (
           <section>
             <header>
               {header}
              <span> by.{writer}</span>
               <button className="close" onClick={close}>
                 &times;
               </button>
             </header>
             <main>{props.children}</main>
             <footer>
                 <span>by.{writer}</span>
             </footer>
           </section>
         ) : null}
       </div>
     );
   };

   export default VisualModal