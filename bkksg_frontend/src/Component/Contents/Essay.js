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

const Essay = (props) => {
     const [isOpen, setIsOpen] = useState(false);
     const {themeMode, themeHandler} = props;

          return(
               <GridContainer>
                    <Header themeHandler= {themeHandler}
                    isOpen = {isOpen} setIsOpen = {setIsOpen}/>
                    <Sidebar pullUp = {isOpen ? true : false} setIsOpen = {setIsOpen}/>
                    <TextContent themeMode = {themeMode} pullUp = {isOpen ? true : false} mode = 'essay'/>
                    <Footer/>
               </GridContainer>
          )
}


export default Essay