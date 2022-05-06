import React, { useState, useEffect } from "react"
import { Route, Routes, BrowserRouter as Router } from "react-router-dom"
import ContentPage from "./Component/page/ContentPage"
import Admin from "./Component/page/Admin"
import Centre from "../src/Component/page/Centre"
import MetaTags from "./Component/lib/MetaTags"
import axios from "axios"
import getTheme from "../src/Component/lib/getTheme"
import "./static/css/reset.css"

function Bkksg() {
  const [content, getContent] = useState("")
  const [type, getType] = useState("")
  const [themeMode, setThemeMode] = useState(getTheme) //Day;
  const [checkIe, detectBrowser] = useState(false)

  useEffect(() => {
    getAxiosforAdmin()
    if (localStorage.getItem("Theme") === null)
      localStorage.setItem("Theme", getHour())
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
    // admin contet list 불러옴.
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

  const getHour = () => {
    const now = new Date()
    if (now.getHours() > 18 && now.getHours() < 7 ) return "night"
    else return "day"
  };

  return (
    <>
    <Router>
    <MetaTags url = {'https://www.bkksg.com/'} desc = '비껴서서 생각하고 설계하고 만드는 林이로의 움직이는 화랑 | "나는 스스로 어른이 되기로 했다."' title = '비껴서기 | BKKSG'/> 
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
