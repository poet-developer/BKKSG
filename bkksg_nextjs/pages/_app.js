import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import "../styles/globals.css";
import "../styles/basicCss.css";
import "../styles/gridSystem.css";
import "../styles/masonry.css";
import "../styles/switch.css";
import "../styles/detail.css";
import "../styles/search.css";
import "../styles/card.css";
import "../styles/jogakbo.css";
import "../styles/about.css";
import theme from "../src/Component/lib/theme";
import { ThemeProvider } from "styled-components";
import getTheme from "../src/Component/lib/getTheme";
import Header from "../src/Component/UI/Header";
import Footer from "../src/Component/UI/Footer";
import Sidebar from "../src/Component/UI/Sidebar";

function MyApp({ Component, pageProps }) {
  const [themeMode, setThemeMode] = useState(getTheme); //Day;
  const [isDetail, setIsDetail] = useState(false);
  // Content Read 모드인지 확인하는 state
  const [componentMounted, setComponentMounted] = useState(false);
  const router = useRouter(); // 동적 라우팅을 위한 분기

  useEffect(() => {
    setThemeMode(getTheme);
    setComponentMounted(true);
  }, [router]);

  const themeHandler = () => {
    setThemeMode(!themeMode);
  };

  if (!componentMounted) return <div />;

  return (
    <ThemeProvider theme={themeMode ? theme.night : theme.day}>
      <div className="grid-container">
        <Header
          themeMode={themeMode}
          themeHandler={themeHandler} // day or night
          isDetail={isDetail}
        />
        <Sidebar themeMode={themeMode} isDetail={isDetail} />
        <Component
          theme={theme}
          themeMode={themeMode}
          themeHandler={themeHandler}
          detailHandler={(detail) => {
            if (detail === true) setIsDetail(true);
            else setIsDetail(false); // header와 sidebar는 없어진다.
          }}
          {...pageProps}
        />
        <Footer themeMode={themeMode} />
      </div>
    </ThemeProvider>
  );
}

export default MyApp;
