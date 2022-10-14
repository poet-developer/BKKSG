import Head from "next/head";

const HeadMeta = ({ title, topic, id, cover, url}) => {
  return (
    <Head>
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
     <meta name="viewport" content="width=device-width, initial-scale=1" />
     <meta name="theme-color" content="#000000" />
     <title>{`비껴서기 | ${title}`}</title>
        <meta name="title" content = {
             id
             ?`${title} | ${topic}`
             :`비껴서기 | ${title}`}/>
        <meta name="theme-color" content="#4B3872"
        media="(prefers-color-scheme: dark)"/>
        <meta name="description" itemprop="description" content={
          id?
          `${title} | ${topic} | 林이로가 비껴서서 생각하고 설계하고 만드는, 움직이는 화랑 | 글, 시각, 설치, 기획` 
          :
          `林이로가 비껴서서 생각하고 설계하고 만드는, 움직이는 화랑 | 글, 시각, 설치, 기획`}/>
        <meta name="keywords" itemprop="keywords" content= {
              id?
              `${title}, ${topic}, 비껴서기, bkksg, ㅂㄲㅅㄱ, IROLIM, 이로, 시, 수필, 글, Art, 시각, 설치, 기획, poetdeveopler, 林이로, 움직이는 화랑`
              :
             `비껴서기, bkksg, ㅂㄲㅅㄱ, IROLIM, 이로, 시, 수필, 글, Art, 시각, 설치, 기획, poetdeveopler, 林이로, 움직이는 화랑`}/>
        <meta name="author" content="IROLIM"/>
        <meta http-equiv="Email" content="bkksg.studio@gmail.com" />

        <meta property="og:type" content="website" />
        <meta property="og:title" content={`비껴서기 | ${title}`} />
        <meta property="og:site_name" content={`비껴서기 | ${title}`} />
        <meta property="og:description" content={id ? `${title} | ${topic}` :`林이로가 비껴서서 생각하고 설계하고 만드는, 움직이는 화랑 | 글, 시각, 설치, 기획`}/>
        <meta property="og:image" content={ cover ? `${process.env.NEXT_PUBLIC_REACT_AWS_CLOUDFRONT}w330/${cover}`:`../../../public/bkksg_thumbnail.png`}/>
        <meta property="og:url" content={id ? url : `http://bkksg.com/`} />
        <meta property="og:image:width" content="1200"/>
        <meta property="og:image:height" content="630"/>
        <meta name="twitter:card" content="summary"/>
        <meta name="twitter:title" content={`비껴서기 | ${title}`} />
        <meta name="twitter:description" content={id ? `${title} | ${topic}`:`林이로가 비껴서서 생각하고 설계하고 만드는, 움직이는 화랑 | 글, 시각, 설치, 기획`}/>
        <meta name="twitter:image" content={ cover ? `${process.env.NEXT_PUBLIC_REACT_AWS_CLOUDFRONT}w330/${cover}`:`../../../public/bkksg_thumbnail.png`}/>
        <meta name="naver-site-verification" content={process.env.NEXT_PUBLIC_REACT_NAVER_SITE_VERIFICATION} />

        <link rel="canonical" href={id ? url : `http://bkksg.com/`} />
    </Head>
  );
};

export default HeadMeta;