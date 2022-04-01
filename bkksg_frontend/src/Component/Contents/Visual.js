import React, {useState} from "react";
import Header from '../UI/Header'
import Sidebar from '../UI/Sidebar';
import Footer from '../UI/Footer';
import styled from "styled-components";
import ImgContent from '../UI/imgContent';
import "../../static/css/masonry.css";

const GridContainer = styled.div`
     display: grid;
    width: 100vw;
    height:100%;
    
    grid-auto-columns: minmax(auto,200px) auto; 
    grid-template-areas:
                "header header"
                "sidebar content"
                "footerBtn footerBtn"
                "footer footer";
`

   
const Visual
 = () => {
     const [isOpen, setIsOpen] = useState(false)
          return(
               <GridContainer>
                    <Header isOpen = {isOpen} setIsOpen = {setIsOpen}/>
                    <Sidebar pullUp = {isOpen ? true : false} setIsOpen = {setIsOpen}/>
                    <ImgContent pullUp = {isOpen ? true : false} mode = 'visual'/>
                    <Footer/>
               </GridContainer>
          )
}


export default Visual
