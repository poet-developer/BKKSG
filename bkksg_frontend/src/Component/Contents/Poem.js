import React, {useState} from "react";
import Header from '../UI/Header'
import Sidebar from '../UI/Sidebar';
import TextContent from '../UI/TextContent';
import Footer from '../UI/Footer';
import styled from "styled-components";

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

const Poem = () => {
     const [isOpen, setIsOpen] = useState(false)
          return(
               <GridContainer>
                    <Header isOpen = {isOpen} setIsOpen = {setIsOpen}/>
                    <Sidebar pullUp = {isOpen ? true : false} setIsOpen = {setIsOpen}/>
                    <TextContent pullUp = {isOpen ? true : false} mode = 'poem'/>
                    <Footer/>
               </GridContainer>
          )
}


export default Poem