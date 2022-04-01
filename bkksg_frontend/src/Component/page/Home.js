import React, {useState} from "react";
import Header from '../UI/Header'
import Sidebar from '../UI/Sidebar';
import ImgContent from '../UI/imgContent';
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


const Home = () => {

     const [isOpen, setIsOpen] = useState(false);
        
          return(
               <GridContainer>
                    <Header isOpen = {isOpen} setIsOpen = {setIsOpen}/>
                    <Sidebar pullUp = {isOpen ? true : false} setIsOpen = {setIsOpen}/>
                    <ImgContent pullUp = {isOpen ? true : false} mode = 'home'/>
                    <Footer/>
               </GridContainer>
          )
}


export default Home