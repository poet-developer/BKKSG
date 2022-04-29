import React, {useState} from "react"
import Header from '../UI/Header'
import Sidebar from '../UI/Sidebar'
import ImgContent from '../UI/imgContent'
import Footer from '../UI/Footer'
import styled from "styled-components"



const GridContainer = styled.div`
    display: grid;
    width: 100vw;
    height:100%;
    margin: -1rem;
    
    grid-auto-columns: minmax(auto,200px) auto; 
    grid-template-areas:
                "header header"
                "sidebar content"
                "footerBtn footerBtn"
                "footer footer";
`


const Home = (props) => {
     const {themeMode, themeHandler} = props;
     const [isModal, setIsModal] = useState(false);
          return(
               <GridContainer>
                    <Header themeHandler= {themeHandler} isModal = {isModal}/>
                    <Sidebar themeMode = {themeMode} />
                    <ImgContent themeMode = {themeMode} mode = 'home' modalHandler ={function(is){
                         if(is) { setIsModal(true)} else {setIsModal(false)}
                    }}/>
                    <Footer themeMode = {themeMode}/>
               </GridContainer>
          )
}


export default Home