import React, { useEffect } from "react"
import "../../static/css/modal.css"
import "../../static/css/basicCss.css"
import styled, { ThemeProvider } from "styled-components"
import theme from "../lib/theme"
import StopScroll from "../lib/StopScroll"

const Header = styled.header`
  background: ${props =>
    props.color
      ? `linear-gradient(69deg, ${props.color} -60%, ${props.theme.colors.detailHeader.mid} 68%, ${props.theme.colors.detailHeader.end} 91%)`
      : theme.common.color};
`;

const CancelButton = styled.button`
  color: ${props => props.theme.colors.cancel};
`;

const Main = styled.main`
  display: flex;
  justify-content: center;
  z-index: 2;
  min-height: 50vh;
  min-width: 90%;
  padding: 2.5rem 5vw;
  line-height: 35px;
  font-family: "koreanMain";
  font-size: 17px;
  color: ${props => props.theme.colors.section};
  background: ${props => props.theme.colors.modal};
`;

const DetailModal = props => {
  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
  const { open, close, header, topic, src, themeMode } = props;
  useEffect(StopScroll,[]);

  return (
    <ThemeProvider theme={themeMode ? theme.night : theme.day}>
      <div className={open ? "openModal modal" : "modal"}>
        {open ? (
          <section className = "modal-section text-content">
            {topic === "project" ? (
              <div
                style={{
                  position: "sticky",
                  zIndex: "-5",
                  top: "0",
                  height: "15rem",
                  width: "100%",
                }}
              >
                <img style = {{ width: '100%', height: '130%',
                objectFit: 'cover'}}
                  src={`https://d2oispwivf10h4.cloudfront.net/w1024/${src}`}
                />
                <div className = "project-header">
                  <h4 style={{ maxWidth: "15rem", fontSize: "21px", lineHeight: "2rem" }}>
                    {header}
                  </h4>
                </div>
              </div>
            ) : (
              <Header className = "modal-header" color={src}>
                <div style={{ maxWidth: "20rem", color: theme.common.color}}>
                  {header}
                </div>
              </Header>
            )}
            <CancelButton className="close cancel-button" onClick={close}>
              &times;
            </CancelButton>
            <Main topic={topic}>{props.children}</Main>
          </section>
        ) : null}
      </div>
    </ThemeProvider>
  );
};

export default DetailModal
