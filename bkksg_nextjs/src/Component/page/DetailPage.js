import React from "react"
import styled  from "styled-components";
import theme from '../lib/theme';
import Parser from 'html-react-parser';

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
top: ${props => props.topic === 'project' ? '10rem' : '2.5rem'};
left: 4rem;
width: 16rem;
line-height: 2rem;
`
const MainContainer = styled.div`
z-index: 2;
width: 100%;
line-height: 2.2rem;
font-size: 1.1rem;
color: ${props => props.theme.colors.section};
background: ${props => props.theme.colors.modal};
-webkit-user-select:none;
-moz-user-select:none;
-ms-user-select:none;
user-select:none;
`

const MainItem = styled.section`
padding: 1.2rem 4.5vw;
min-height: 100vh;
`

const LogoFooter = styled.div`
border-top: ${props => props.theme === true ? "solid 0.1px rgba(200,200,200,0.5)" : "solid 0.1px rgba(200, 200, 200, 0.5)"};

`

function getContentDetail(props) {
  const { themeMode, data} = props;
  return (
      <div className='modal-container'>
      <DetailHeader src = {data.cover_src} topic = {data.topic} imgSrc = {data.cover_src ? `url(${process.env.NEXT_PUBLIC_REACT_AWS_CLOUDFRONT}w1024/${data.cover_src})`:''}>
      <div className = "project-header">
        <Title topic={data.topic}>
        {data.title}
        </Title>
      </div>
    </DetailHeader>
      <MainContainer>
      <MainItem topic= {data.topic} 
      >
        {Parser(data.description)}
      </MainItem>
      <LogoFooter className="logo-footer" theme={themeMode}>비껴서기 | BKKSG</LogoFooter>
      </MainContainer>
    </div>
  )
}

export default getContentDetail
