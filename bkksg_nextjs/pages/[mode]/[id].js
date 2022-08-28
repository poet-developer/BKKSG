import { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import React from "react"
import DetailTest from '../../src/Component/page/DetailTest';
import axios from 'axios'
import Error from '../../src/Component/page/Error';

function getContentDetail(props) {
  const { themeMode, themeHandler, modalHandler} = props;
  const [data, setData] = useState({})
  const router = useRouter()
  const id = router.query.id
  const mode = router.query.mode
  
  useEffect(()=> {
    callData(id);
    modalHandler(); // hide header 
    
  }, [])

  const callData = async(id) => {
    try{
      await axios
        .get("/api/getTheContent/", {
          params: {id: id },
        })
        .then((res) => {
          if(res.data.topic === mode){
            setData(
            { title : res.data.title,
              desc :res.data.description,
              topic : res.data.topic,
              src : res.data.cover_src,
            });
          }else{
            router.push('/error')
          }
        })
    }catch(err){
        console.log(err)
        throw new Error(err)
    }
  }

  return (
    /** Need A Comp framing Content's detail.  **/
       <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', width: '103vw', height: '85vh', border: "2px red solid"}}>
      { data.topic === 'poem' || data.topic === 'essay'
      ? 
      <> 
      <h1>{data.title}</h1>
      <div style={{background : data.src }}>
      <section dangerouslySetInnerHTML={{ __html: data.desc }}></section>
      </div>
      </>
      //poem && essay && project COMP
      :
      // visual COMP
      <>
      <img className="visual-image" src={`https://d2oispwivf10h4.cloudfront.net/w1024/${data.src}`} alt ={data.topic}/>{data.title}
      </> 
      /** Need A Comp framing Content's detail.  **/
    }
    </div>
  )
}


getContentDetail.getInitialProps = async context => {
  // this.setMode(context.mode)
   }

export default getContentDetail
