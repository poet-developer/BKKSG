import React, { useEffect } from "react";
import styled from "styled-components";
import theme from "../lib/theme";
import StopScroll from "../lib/StopScroll"

const Header = styled.header`
  color: ${theme.common.color};
  height: 1.5rem;
  position: sticky;
  font-size: 1.3rem;
  `;

const CancelButton = styled.button`
  color: ${theme.common.color};
  height: 1.5rem;
  font-size: 24px;
  width: 1.5rem;
`;
const VisualModal = props => {
  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
  const { open, close, header, data } = props;
  useEffect(StopScroll,[]);

  return (
    // 모달이 열릴때 openModal 클래스가 생성된다.
      <div className={open ? "openModal modal" : "modal"}>
        {open ? (
            <>
            <main style={{marginBottom: '1rem'}}>
              <Header className = "">{header}
              <CancelButton className="close cancel-button" onClick={close}>
                &times;
              </CancelButton>
              </Header>
              
              <section className="visual-content">
              <img className="visual-image" src={`https://d2oispwivf10h4.cloudfront.net/w1024/${data}`} alt ={header}/>
              </section>
              <div style={{position: "sticky", right:"0", textAlign: 'right', color: theme.common.color, fontSize: '0.7rem', marginBottom: "1.5rem",
              marginTop: "0.3rem"}}>비껴서기 | BKKSG</div>
            </main>
              
            </>
        ) : null}
      </div>
  );
};

export default VisualModal;
