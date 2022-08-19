import React, { useState, useEffect } from "react"
import { Route, Routes, BrowserRouter as Router } from "react-router-dom"
import ContentPage from "./Component/page/ContentPage"
import Admin from "./Component/page/Admin"
import Centre from "../src/Component/page/Centre"
import axios from "axios"
import getTheme from "../src/Component/lib/getTheme"
import "./static/css/reset.css"

function Bkksg() {
  const [content, getContent] = useState("")
  const [type, getType] = useState("")
  const [checkIe, detectBrowser] = useState(false)
  const [themeMode, setThemeMode] = useState(getTheme) //Day;
  
  useEffect(() => {
    getAxiosforAdmin()
    if (localStorage.getItem("Theme") === null){
      const now = new Date()
      let _now;
        if (now.getHours() > 18 && now.getHours()>8 )
        _now= "night"
        else _now= "day"
      localStorage.setItem("Theme", _now);
      setThemeMode(getTheme)
  }
    detectBrowser(detectIE)
  }, [])

  const getAxiosforAdmin = async () => {
    try{
    await axios
      .get("/admin")
      .then((res) => {
        getContent(res.data.contents)
        getType(res.data.types)
      })
      .catch(console.log)
    } catch (err) {
      console.log(err)
      throw new Error(err)
    }
  };

  const themeHandler = () => {
    setThemeMode(!themeMode)
  };
  const detectIE = () => {
    // Internet Explorer 6-11
    const isIE = /*@cc_on!@*/ false || !!document.documentMode
    // Edge 20+
    const isEdge = !isIE && !!window.StyleMedia
    if (isIE || isEdge) return true
  };

  return (
    <>
    <Router>
      {!checkIe ? (
        <Routes>
          <Route
            path=""
            element={<ContentPage themeMode={themeMode} themeHandler={themeHandler} mode = "home" />}
          />
          <Route
            path={"poem"}
            element={<ContentPage themeMode={themeMode} mode = 'poem' themeHandler={themeHandler} />}
          />
          <Route
            path="essay"
            element={
              <ContentPage themeMode={themeMode} mode = 'essay' themeHandler={themeHandler} />
            }
          />
          <Route
            path="visual"
            element={
              <ContentPage themeMode={themeMode} mode = 'visual' themeHandler={themeHandler} />
            }
          />
          <Route
            path="project"
            element={
              <ContentPage themeMode={themeMode} mode = 'project' themeHandler={themeHandler} />
            }
          />
          <Route path={process.env.REACT_APP_ADMIN1} element={<Centre/>}>
            <Route
              path={process.env.REACT_APP_ADMIN2}
              element={
                content && type ? <Admin content={content} type={type} /> : ""
              }
            />
          </Route>
        </Routes>
      ) : (
        `해당 브라우저를 지원하지 않습니다. | This Browser Is Denied to Access This App.`
      )}
    </Router>
    </>
  );
}

export default Bkksg
