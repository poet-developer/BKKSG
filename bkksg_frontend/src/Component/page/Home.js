import React, {useState} from "react";
import Header from '../UI/Header'
import Sidebar from '../UI/Sidebar';
import Content from '../UI/Content';
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
    grid-gap: 4.5rem 0;
    gap: 4.5rem 0;
`

const Home = () => {
     const [isOpen, setIsOpen] = useState(false)
          return(
               <GridContainer>
                    <Header isOpen = {isOpen} setIsOpen = {setIsOpen}/>
                    <Sidebar pullUp = {isOpen ? true : false}/>
                    <Content/>
                    <Footer/>
               </GridContainer>
          )
}


export default Home