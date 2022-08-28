import { useRouter } from 'next/router'
import React from "react"
import ContentPage from '../../src/Component/page/ContentPage';

function TopicMode(props) {
  const { themeMode, themeHandler} = props;
  const router = useRouter()
  const mode = router.query.mode
  return (
    <ContentPage themeMode={themeMode} themeHandler={themeHandler} modalHandler={is =>{
      if (is) setIsModal(true)
      else setIsModal(false)
    }} 
    mode = {mode} />
  )
}


TopicMode.getInitialProps = async context => {
  // console.log(context);
  // const {  ctx, Component } = context;
  // let pageProps = {};
  // if (Component.getInitialProps ) {
    // pageProps = await Component.getInitialProps(ctx.query);
    // 실행 컴포넌트 렌더링 전에 컴포넌트의 다이나믹 라우팅 데이터(getInitialProps)를 읽어서 제일 먼저 데이터 넣어줌 -> 그후 렌더링 시킴
  // }
  // return { props: { event: modalHandler ,data: pageProps } }
}

export default TopicMode
