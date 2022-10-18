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
import Head from "next/head";

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
    <Head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#4B3872" />
      <title>비껴서기 | BKKSG</title>
        <meta name="title" content = "비껴서기 | BKKSG"/>
        <meta name="description" itemprop="description" content='비껴서기 | BKKSG : 林이로가 비껴서서 생각하고 설계하고 만드는, 움직이는 화랑 | 글, 시각, 설치, 기획'/>
        <meta name="keywords" itemprop="keywords" content= "비껴서기, bkksg, ㅂㄲㅅㄱ, IROLIM, 시, 수필, 글, Art, 시각, 설치, 기획, poetdeveopler, 林이로, 움직이는 화랑" />
        <meta name="author" content="IROLIM"/>
        <meta http-equiv="Email" content="bkksg.studio@gmail.com" />

        <meta property="og:type" content="website" />
        <meta property="og:title" content="비껴서기 | BKKSG" />
        <meta property="og:site_name" content="비껴서기 | BKKSG" />
        <meta property="og:description" content='林이로가 비껴서서 생각하고 설계하고 만드는, 움직이는 화랑 | 글, 시각, 설치, 기획' />
        <meta property="og:url" content="https://bkksg.com/" />
        <meta property="og:image" content='https://bkksg-images.s3.ap-northeast-2.amazonaws.com/ProjectImages_highquality/bkksg_thumbnail.png'/>
        <meta property="og:image:width" content="1200"/>
        <meta property="og:image:height" content="630"/>
        <meta name="twitter:card" content="summary"/>
        <meta name="twitter:title" content="비껴서기 | BKKSG" />
        <meta name="twitter:description" content='林이로가 비껴서서 생각하고 설계하고 만드는, 움직이는 화랑 | 글, 시각, 설치, 기획' />
        <meta name="twitter:image" content='https://bkksg-images.s3.ap-northeast-2.amazonaws.com/ProjectImages_highquality/bkksg_thumbnail.png'/>
        <meta name="naver-site-verification" content="06e98530b2ed4692bfac77549d66e93b9a23f113" />
    </Head>
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
