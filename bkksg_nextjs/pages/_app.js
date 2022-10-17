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
import HeadMeta from "../src/Component/lib/SEO"
import Head from "next/head";
import { NextSeo } from 'next-seo';

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
      {/* <NextSeo
        title="비껴서기 | BKKSG"
				description="비껴서기 | BKKSG : 林이로가 비껴서서 생각하고 설계하고 만드는, 움직이는 화랑 | 글, 시각, 설치, 기획"
				openGraph={{
					type: 'website',
					url: 'http://bkksg.com/',
					title: '비껴서기 | BKKSG',
					description: '비껴서기 | BKKSG : 林이로가 비껴서서 생각하고 설계하고 만드는, 움직이는 화랑 | 글, 시각, 설치, 기획',
					images: [
						{
							url: './thumbnail/bkksg_thumbnail.png',
							width: 1200,
							height: 630,
						},
					],
				}}
			/> */}
    <Head>
    <meta property="og:type" content="website" />
        <meta property="og:url" content={`http://bkksg.com/`} key='og-url' />
        <meta property="og:title" content={`비껴서기 | BKKSG`} key='og-title'/>
        <meta property="og:site_name" content={`비껴서기 | BKKSG`} key='og-site' />
        <meta property="og:description" content={`비껴서기 | BKKSG : 林이로가 비껴서서 생각하고 설계하고 만드는, 움직이는 화랑 | 글, 시각, 설치, 기획`} key='og-desc'/>
        <meta property="og:image" content={'http://bkksg.com/thumbnail/bkksg_thumbnail.png'} key='og-image' />
        <meta property="og:image:width" content="1200"/>
        <meta property="og:image:height" content="630"/>
        <meta name="twitter:card" content="summary"/>
        <meta name="twitter:title" content={`비껴서기 | BKKSG`} />
        <meta name="twitter:description" content={`비껴서기 | BKKSG : 林이로가 비껴서서 생각하고 설계하고 만드는, 움직이는 화랑 | 글, 시각, 설치, 기획`}/>
        <meta name="twitter:image" content={'http://bkksg.com/thumbnail/bkksg_thumbnail.png'}/>
        <meta name="naver-site-verification" content={process.env.NEXT_PUBLIC_REACT_NAVER_SITE_VERIFICATION} />

        <link rel="canonical" href={`http://bkksg.com/`} />
        <link rel="icon" href="http://bkksg.com/favicon.ico"/>
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
