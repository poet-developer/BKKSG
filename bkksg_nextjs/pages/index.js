import React from "react"
import ContentPage from "../src/Component/page/ContentPage"

function Bkksg(props) {

  const { themeMode, themeHandler, setIsModal } = props;
  return (
              <ContentPage themeMode={themeMode} themeHandler={themeHandler} modalHandler={is =>{
                if (is) setIsModal(true)
                else setIsModal(false)
              }} mode = "home" />
  )
}

export default Bkksg
