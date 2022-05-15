import React from 'react';
import { Helmet } from 'react-helmet-async';

const MetaTags = props => {
  // props로 content 내용을 불러올 예정임
    return (
      <Helmet>
        <title>{props.title}</title>
        <meta name="title" content = {props.title}/>
        <meta name="theme-color" content="#dcdcdc"
        media="(prefers-color-scheme: light)"/>
        <meta name="theme-color" content="#000000"
        media="(prefers-color-scheme: dark)"/>
        <meta name="description" content= {props.dsec} data-react-helmet="true"/>
        <meta name="keywords" content= "비껴서기, bkksg, ㅂㄲㅅㄱ, IROLIM, 시, 수필, 글, Art, 조각, poetdeveopler, 林이로," />
        <meta name="author" content="IROLIM"/>
        <meta http-equiv="Email" content="bkksg.studio@gmail.com" />

        <meta property="og:type" content="website" />
        <meta property="og:title" content={props.title} />
        <meta property="og:site_name" content={props.title} />
        <meta property="og:description" content={props.dsec} />
        <meta property="og:image" content='/static/bkksg_thumbnail.png'/>
        <meta property="og:url" content={props.url} />
        <meta property="og:image:width" content="1200"/>
        <meta property="og:image:height" content="630"/>
        <meta name="twitter:card" content="summary"/>
        <meta name="twitter:title" content={props.title} />
        <meta name="twitter:description" content='비껴서기 스튜디오' />
        <meta name="twitter:image" content='/static/img/bkksg_thumbnail.png' />

        <link rel="canonical" href={props.url} />
      </Helmet>
    );
};

export default MetaTags;