import styled from "styled-components"
import {HiOutlineShoppingCart } from "react-icons/hi"
import theme from '../lib/theme'

const ImageContainer = styled.div`
     background-image : ${props => props ? `url(${process.env.NEXT_PUBLIC_REACT_AWS_CLOUDFRONT}w1024/${props.src})` : ``};
     cursor: ${props => props.isCursor ? 'pointer' : 'auto'};
     `
     
     const DetailSection = styled.div`
     background: ${props => props.theme.colors.innerDetail};
     `
     
     const Description = styled.section`
     color: ${theme.common.color};
     margin-top: 1.3rem;
     padding: 0 2rem 0 1.5rem;
     opacity: 0.8;
     `

     const LinkButton = styled.div`
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
     border-top: solid 0.1px rgba(240, 240, 240, 0.2);
     color: rgba(240, 240, 240, 1);
   `

const VisualPage = props => {
     const { data, themeMode } = props;
     const goLink = (e) => {
          try { if (e) window.open(data.link) }
          catch(err){ throw new Error("Failed to Go Back.") }
        }

return(
      <div className='modal-container'>
        <DetailSection className="visual-detail-section">
          <div style={{width: '100vw', minHeight: '92vh'}}></div>
            <div className='visual-desc-container'>
            <div className='visual-desc-item'>
            <h1 className="visual-title">| {data.title}
              {data.link 
              ? <LinkButton className="visual-link-btn" onClick={goLink}>
              <HiOutlineShoppingCart/>
              </LinkButton>
              : ''
              } 
            </h1>
            <Description 
            style={{padding: '0 2rem 0 1.5rem'}}
            dangerouslySetInnerHTML={{ __html: data.description }}/>
            <LogoFooter className="logo-footer" themeMode={themeMode}>비껴서기 | BKKSG</LogoFooter>
            </div>
          </div>
        </DetailSection>
      <VisualModal >
      <ImageContainer onClick={data.link ? goLink : null} isCursor ={data.link ? true : false} className='img-container' src = {data.cover_src ? data.cover_src : ''}/>
      <div className="visual-logo-sticker"> 비껴서기 | BKKSG</div>
      </VisualModal>
      </div>
)
}

export default VisualPage