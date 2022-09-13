import { useRouter } from 'next/router'
import React, {useState, useEffect} from "react"
import ContentPage from '../../src/Component/page/ContentPage'
import SessionStorage from '../../src/Component/lib/SessionStorage';
import CanvasAni from '../../src/Component/UI/CanvasAni'

function TopicMode(props) {
  const { themeMode, themeHandler, detailHandler} = props;
  const router = useRouter()
  const mode = router.query.mode
  const [scrollPosition,setSP] = useState(SessionStorage.getItem('sp'))
  const [countCard, setCC] = useState(    SessionStorage.getItem('cc'))
  useEffect(()=>{
    window.scrollTo(0, scrollPosition)
  },[])

  return (
    <>
    { mode === 'jogakbo'
    ? <CanvasAni themeMode = {themeMode} detailHandler = {detailHandler}/>
    :
    <ContentPage themeMode={themeMode} themeHandler={themeHandler} detailHandler={detailHandler}
    scrollPosition = {scrollPosition}
    setCount = {countCard}
    mode = {mode} />
    }
   </>
  )
}

export default TopicMode
