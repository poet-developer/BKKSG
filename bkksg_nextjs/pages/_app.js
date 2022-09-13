import { useState, useEffect } from "react";
import { useRouter } from 'next/router'
import '../styles/globals.css'
import '../styles/basicCss.css'
import '../styles/gridSystem.css'
import '../styles/masonry.css'
import "../styles/switch.css";
import "../styles/modal.css";
import "../styles/reset.css"
import theme from "../src/Component/lib/theme"
import { ThemeProvider } from 'styled-components'
import getTheme from '../src/Component/lib/getTheme';
import Header from "../src/Component/UI/Header";
import Footer from "../src/Component/UI/Footer"
import Sidebar from "../src/Component/UI/Sidebar";


function MyApp({ Component, pageProps }) {
  const [themeMode, setThemeMode] = useState(getTheme) //Day;
  // const [checkIe, detectBrowser] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [isDetail, setIsDetail] = useState(false)
  // const [resized, setResizeEvent] = useState(false)
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


  // const detectIE = (win) => {
  //   // Internet Explorer 6-11
  //   const isIE = /*@cc_on!@*/ false || !!document.documentMode
  //   // Edge 20+
  //   const isEdge = !isIE && !!win.StyleMedia
  //   if (isIE || isEdge) return true
  //   else false
  // };
  
  return (
    <>
    {/* {!checkIe ?  */}
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
    {/* :
        `해당 브라우저를 지원하지 않습니다. | This Browser Is Denied to Access This App.`
  } */}
  </>
  )
}

MyApp.getInitialProps = async context => {
  const {  ctx, Component } = context;
  let pageProps = {};
  console.log('연구',Component)
  if (Component.getInitialProps ) {
    pageProps = await Component.getInitialProps(ctx);
    //실행 컴포넌트 렌더링 전에 컴포넌트의 다이나믹 라우팅 데이터(getInitialProps)를 읽어서 제일 먼저 데이터 넣어줌 -> 그후 렌더링 시킴
  }
  return { props: { data: pageProps, scroll: '위치테스트' } }
}


export default MyApp
