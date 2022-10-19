import React, { useState } from "react"
import Content from "../src/Component/UI/Content";
import SessionStorage from "../src/Component/lib/SessionStorage";
import axios from "axios";
import HeadMeta from "../src/Component/lib/SEO"


function Bkksg(props) {
  const { themeMode, themeHandler, detailHandler, item, seoData } = props;
  const [scrollPosition,setSP] = useState(SessionStorage.getItem('sp'))
  const [countCard, setCC] = useState(SessionStorage.getItem('cc'))

  return (
    <>        
    <HeadMeta title='BKKSG'/>
              <Content themeMode={themeMode} themeHandler={themeHandler} detailHandler={
                detailHandler
              }
              scrollPosition = {scrollPosition || '0'}
              setCount = {countCard || null}
              mode = "home"
              data = {item ? item.contents : ''}
              />
    </>
  )
}

export default Bkksg

export async function getServerSideProps(context){
  const res = await axios.get("http://localhost:7272/api/getTypeContents/", {
    params: {mode: '' },
  })

  const data = res.data
  return {
    props : {
      item: data,
    }
  }
}