import React, { useEffect } from "react"
import Error from './Error';
import styled  from "styled-components";
import theme from '../lib/theme';

const DetailHeader = styled.div`
  position: sticky;
  z-index: -5;
  top: 0;
  height: ${props => props.topic === 'project' ? '20rem' : '10rem'};
  width: 100%;
  background: ${props =>
    props.src
      ? `linear-gradient(69deg, ${props.src} -60%, ${props.theme.colors.detailHeader.mid} 68%, ${props.theme.colors.detailHeader.end} 91%)`
      : theme.common.color};};
  background-image : ${props => props.topic === 'project' ? props.imgSrc : ''};
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`
const Title = styled.h4`
position: absolute;
top: ${props => props.topic === 'project' ? '10rem' : '4rem'};
left: 5rem;
`
const MainContainer = styled.div`
z-index: 2;
width: 100%;
// min-height: 100vh;
// height:100%;
line-height: 35px;
font-family: "koreanMain";
font-size: 17px;
color: ${props => props.theme.colors.section};
background: ${props => props.theme.colors.modal};
-webkit-user-select:none;
-moz-user-select:none;
-ms-user-select:none;
user-select:none;
`

const MainItem = styled.section`
padding: 3rem 4.5vw;
min-height: 100vh;
`

const LogoFooter = styled.div`
  width: 100vw;
  text-align: center;
  padding: 1rem 0rem 3rem 0;
  font-size: 0.8rem;
  border-top: ${props => props.theme === true ? "solid 0.1px rgba(200,200,200,0.3)" : "solid 0.1px rgba(200, 200, 200, 0.3)"};
`

function getContentDetail(props) {
  const { themeMode, data} = props;
  console.log(data.topic);
  return (
      <div>
      <DetailHeader src = {data.src} topic = {data.topic} imgSrc = {`url(https://d2oispwivf10h4.cloudfront.net/w1024/${data.src})`}>
      <div className = "project-header">
        <Title topic={data.topic}>
        {data.title}
        </Title>
      </div>
    </DetailHeader>
      <MainContainer>
      <MainItem topic= {data.topic} dangerouslySetInnerHTML={{ __html: data.desc }}></MainItem>
      <LogoFooter theme={themeMode}>비껴서기 | BKKSG</LogoFooter>
      </MainContainer>
    </div>
  )
}

export default getContentDetail
