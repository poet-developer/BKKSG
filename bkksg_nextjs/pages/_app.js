import React, { useState, useEffect } from "react"
import { useRouter } from 'next/router'
import '../styles/globals.css'
import '../styles/basicCss.css'
import '../styles/gridSystem.css'
import '../styles/masonry.css'
import "../styles/switch.css"
import "../styles/detail.css"
import "../styles/search.css"
import "../styles/card.css"
import "../styles/jogakbo.css"
import theme from "../src/Component/lib/theme"
import { ThemeProvider } from 'styled-components'
import getTheme from '../src/Component/lib/getTheme'
import Header from "../src/Component/UI/Header"
import Footer from "../src/Component/UI/Footer"
import Sidebar from "../src/Component/UI/Sidebar"

function MyApp(
  { Component, pageProps }
  ) {
  const [themeMode, setThemeMode] = useState(getTheme) //Day;
  const [isOpen, setIsOpen] = useState(false)
  const [isDetail, setIsDetail] = useState(false)
  const [componentMounted, setComponentMounted] = useState(false);
  const router = useRouter();
  
  useEffect(() => {  
    setThemeMode(getTheme)
    setComponentMounted(true); 
  },[router])

  const themeHandler = () => {
    setThemeMode(!themeMode)
  };

  
  if (!componentMounted) return <div />
  
  return (
    <ThemeProvider theme={themeMode ? theme.night : theme.day}>
    <div className="grid-container">
    <Header
      themeMode={themeMode}
      themeHandler={themeHandler}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      isDetail={isDetail}/>
    <Sidebar
        themeMode={themeMode}
        pullUp={isOpen ? true : false}
        setIsOpen={setIsOpen}
        isDetail={isDetail}
      />
      <Component theme = {theme} themeMode = {themeMode} themeHandler = {themeHandler} detailHandler = {(detail) => {
        if(detail === true) setIsDetail(true)
        else setIsDetail(false)
      }} {...pageProps} />
    <Footer themeMode={themeMode} />
    </div>
    </ThemeProvider>
  )
}

export default MyApp
