import styled from "styled-components";
import {HiOutlineShoppingCart } from "react-icons/hi"
import theme from '../lib/theme';

const ImageContainer = styled.div`
     position: absolute;
     left: 0;
     top: 0;
     background-image : ${props => `url(https://d2oispwivf10h4.cloudfront.net/w1024/${props.src})`};
     background-position: center 70%;
     background-repeat: no-repeat;
     background-size: contain;
     width: 100%;
     height: 100%;

     -webkit-touch-callout: none;
     user-select: none;
     -moz-user-select: none;
     -ms-user-select: none;
     -webkit-user-select: none;
     user-select : none;
     `
     
     const DetailSection = styled.div`
     position: absolute;
     left:0;
     top:0;
     z-index: -5;
     width: 100vw;
     min-height: 100vh;
     background: ${props => props.theme.colors.innerDetail};
     `
     
     const Title = styled.h1`
     color: azure;
     font-size: 1.3rem;
     font-family: "koreanMain";
     font-wight: bold;
     padding-left: 0.5rem;
     width: 14rem;
     `
     
     const Logo = styled.div`
     position: absolute;
     bottom: 0;
     right: 0;
     font-family: "koreanMain";
     font-size: 0.8rem;
     color: azure;
     padding: 0.2rem 0.5rem;
     opacity: 0.7;
     `
     
     const Description = styled.section`
     color: ${theme.common.color};
     font-size: 1rem;
     font-family: "koreanMain";
     font-style: italic;
     margin-top: 1.3rem;
     padding-left: 0.6rem;
     padding-bottom: 1rem;
     opacity: 0.8;
     `

    const DESCContainer = styled.div`
      margin: '0.5rem 1rem';
      display: 'flex';
      justify-content: 'space-between';
    `

    const DESCItem = styled.div`
      padding-top: 1.5rem;
    `

     const LinkButton = styled.div`
     display: inline-block;
     transform: scale(1.3) translateY(3.5px);
     color: azure;
     cursor: pointer;
     opacity: 0.6;
     padding-left: 0.7rem;
     margin-left: 0.5rem;
     &:hover{
     opacity: 1;
     }
     `

     const VisualModal = styled.div`
     position: relative;
     width: 100vw;
     height: 90vh;
     background : ${props => props.theme.colors.main};
     box-shadow: ${props => props.theme.glass.detailShadow};
     backdrop-filter: ${props => props.theme.glass.filter};
     -webkit-backdrop-filter: ${props => props.theme.glass.border.line};
     border-radius: ${props => props.theme.glass.border.radius};
     `

     const LogoFooter = styled.div`
     width: 100vw;
     text-align: center;
     padding: 1rem 0rem 3rem 0;
     font-size: 0.8rem;
     margin-top: 0.5rem;
     border-top: 0.1px solid rgba(240, 240, 240, 0.5);
     color: rgba(240, 240, 240, 1);
     opacity: 0.8;
     font-family: "koreanMain";
   `

const VisualPage = (props) => {
     const { data, themeMode } = props;

     const goLink = (e) => {
          try {
            if (e) router.push(data.link)
            }catch(err){
              throw new Error("Failed to Go Back.")
            }
        }
    
    const goBack = (e)=>{
      try {
      if (e) window.history.back()
      }catch(err){
        throw new Error("Failed to Go Back.")
      }
    }


return(
      <div className='modal-container'>
        <DetailSection>
          <div style={{width: '100vw', minHeight: '92vh'}}></div>
            <DESCContainer className='visual-desc-container'>
            <DESCItem className='visual-desc-item'>
            <Title>| {data.title}
            {data.link 
             ? <LinkButton onClick={goLink}>
            <HiOutlineShoppingCart/>
            </LinkButton>
            : ''
            } 
            </Title>
            <Description dangerouslySetInnerHTML={{ __html: data.desc }}/>
            <LogoFooter themeMode={themeMode}>비껴서기 | BKKSG</LogoFooter>
            </DESCItem>
          </DESCContainer >
        </DetailSection>
      <VisualModal >
      <ImageContainer className='img-container' src = {data.src}/>
      <Logo> 비껴서기 | BKKSG</Logo>
      </VisualModal>
      </div>
)
}

export default VisualPage