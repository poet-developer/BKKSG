import React, { useEffect } from "react";
import "../../static/css/modal.css";
import "../../static/css/basicCss.css";
import styled, { ThemeProvider } from "styled-components";
import theme from "../lib/theme";
import StopScroll from "../lib/StopScroll"

const Header = styled.header`
  color: ${theme.common.color};
  background: ${props => props.theme.gradient.radial}
`;

const CancelButton = styled.button`
  color: ${props => props.theme.colors.cancel};
`;

const Main = styled.main`
  display: flex;
  max-width: 100%;
  justify-content: center;
  margin-top: 3.1rem;

  .main-image{
    width: 100%;
    flex: 1 1 auto;
  }
`;

const VisualModal = props => {
  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
  const { open, close, header, data, themeMode } = props;
  useEffect(StopScroll,[]);

  return (
    // 모달이 열릴때 openModal 클래스가 생성된다.
    <ThemeProvider theme={themeMode ? theme.night : theme.day}>
      <div className={open ? "openModal modal" : "modal"}>
        {open ? (
          <section className="modal-section visualcontent">
            <Header className = "modal-header">{header}</Header>
            <CancelButton className="close cancel-button" onClick={close}>
              &times;
            </CancelButton>
            <Main>
              <img className = 'main-image'
                src={`https://d2oispwivf10h4.cloudfront.net/w1024/${data}`}
              />
            </Main>
          </section>
        ) : null}
      </div>
    </ThemeProvider>
  );
};

export default VisualModal;
