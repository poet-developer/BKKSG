import { useRouter } from 'next/router'
import React, {useState} from "react"
import Content from '../../src/Component/UI/Content'
import SessionStorage from '../../src/Component/lib/SessionStorage'
import CanvasAni from '../../src/Component/UI/CanvasAni'
import axios from "axios"
import styled from 'styled-components'
import HeadMeta from '../../src/Component/lib/SEO'

const Jogakbo = styled.div`
position: absolute;
top:0;
left:0;
`

const Cutton = styled.div`
 position: absolute;
 top:0;
 left:0;
 height: 100%;
 width: 100%;
 background: rgba(10,10,10,0.3);
`


function TopicMode(props) {
  const { themeMode, themeHandler, detailHandler, item} = props;
  const router = useRouter()
  const mode = router.query.mode
  const [scrollPosition,setSP] = useState(SessionStorage.getItem('sp'))
  const [countCard, setCC] = useState(SessionStorage.getItem('cc'))

  return (
    <>
    {/* <HeadMeta title={mode.toUpperCase()}/> */}
    { mode === 'jogakbo'
    ? <Jogakbo><Cutton/><CanvasAni themeMode = {themeMode} detailHandler = {detailHandler}/></Jogakbo>
    :
    <Content themeMode={themeMode} themeHandler={themeHandler} detailHandler={detailHandler}
    scrollPosition = {scrollPosition || '0'}
    setCount = {countCard || null}
    mode = {mode}
    data = {item ? item.contents : ''}
    />
    }
   </>
  )
}

export default TopicMode

export async function getServerSideProps(context){
  const mode = context.params.mode;
  const res = await axios.get("http://localhost:7272/api/getTypeContents/", {
    params: {mode: mode },
  })
  const data = res.data
  return {
    props : {
      item: data
    }
  }
}
