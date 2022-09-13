import React, { useEffect, useState } from "react"
import ContentPage from "../src/Component/page/ContentPage"
import SessionStorage from "../src/Component/lib/SessionStorage";

function Bkksg(props) {
  const { themeMode, themeHandler, detailHandler } = props;
  const [scrollPosition,setSP] = useState( SessionStorage.getItem('sp'))
  const [countCard, setCC] = useState(    SessionStorage.getItem('cc'))

  return (
              <ContentPage themeMode={themeMode} themeHandler={themeHandler} detailHandler={
                detailHandler
              }
              scrollPosition = {scrollPosition}
              setCount = {countCard}
              mode = "home" />
  )
}

export default Bkksg
