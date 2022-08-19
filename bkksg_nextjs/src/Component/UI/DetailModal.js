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
  box-shadow: 0 8px 30px 0 rgba(31, 38, 135, 0.2);
  backdrop-filter: blur(3px);
`;

const CancelButton = styled.button`
  color: ${theme.common.color}
  padding-top: 0.5rem;
  width: 2vw;
`;

const Main = styled.main`
 margin-top: 3rem;
 padding: 5vh 4.5vw;
`;

const MainContainer = styled.div`
z-index: 2;
width: 100%;
min-height: 50vh;
line-height: 35px;
font-family: "koreanMain";
font-size: 17px;
color: ${props => props.theme.colors.section};
background: ${props => props.theme.colors.modal};
`

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
                 alt= {header}/>
                <div className = "project-header">
                  <h4 style={{ maxWidth: "15rem", fontSize: "21px", lineHeight: "2rem" }}>
                    {header}
                  </h4>
                </div>
              </div>
            ) : (
              <Header className = "modal-header" color={src}>
                <div style={{ maxWidth: "15rem", lineHeight: "1.7rem", color: theme.common.color}}>
                  {header}
                </div>
              </Header>
            )}
            <CancelButton className="close cancel-button" onClick={close}>
              &times;
            </CancelButton>
            <MainContainer>
              <Main topic={topic}>{props.children}
              <hr style={{border: "0.1px solid rgba(100,100,100,0.3)"}}/>
              <div style={{width: "100%", textAlign: "center", fontSize: '0.8rem'}}>林이로 | IROLIM</div>
              </Main>
              
            </MainContainer>
          </section>
        ) : null}
      </div>
    </ThemeProvider>
  );
};

export default DetailModal
