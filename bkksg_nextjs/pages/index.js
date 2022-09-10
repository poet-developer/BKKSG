import React from "react"
import ContentPage from "../src/Component/page/ContentPage"

function Bkksg(props) {

  const { themeMode, themeHandler, detailHandler } = props;
  return (
              <ContentPage themeMode={themeMode} themeHandler={themeHandler} detailHandler={
                detailHandler
              } mode = "home" />
  )
}

export default Bkksg
