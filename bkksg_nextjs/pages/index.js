import React, { useState } from "react"
import Content from "../src/Component/UI/Content";
import SessionStorage from "../src/Component/lib/SessionStorage";
import axios from "axios";
import { DefaultSeo } from "next-seo";


function Bkksg(props) {
  const { themeMode, themeHandler, detailHandler, item, seoData } = props;
  const [scrollPosition,setSP] = useState(SessionStorage.getItem('sp'))
  const [countCard, setCC] = useState(SessionStorage.getItem('cc'))

  return (
    <>
    <DefaultSeo {...seoData} />
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

  const DEFAULT_SEO = {
    title: "비껴서기 | BKKSG",
    description: "비껴서기 | BKKSG : 林이로가 비껴서서 생각하고 설계하고 만드는, 움직이는 화랑 | 글, 시각, 설치, 기획",
    canonical: "http://bkksg.com/",
    openGraph: {
      type: "website",
      locale: "ko_KR",
      url: "http://bkksg.com/",
      title: "비껴서기 | BKKSG",
      site_name: "비껴서기",
      images: [
        {
          url: "./public/thumbnail/bkksg_thumbnail.png",
          width: 1200,
          height: 630,
          alt: "BKKSG"
        }
      ]
    },
    twitter: {
        handle: '@bkksgstudio',
        site: '@bkksg.com',
        cardType: 'summary_large_image',
    },
  };

  const data = res.data
  return {
    props : {
      item: data,
      seoData : DEFAULT_SEO
    }
  }
}