import { useState, useEffect} from 'react';
import { useRouter } from 'next/router'
import React from "react"
import DetailPage from '../../src/Component/page/DetailPage';
import axios from 'axios'
import Error from '../../src/Component/page/Error';
import { CgChevronLeft } from "react-icons/cg";
import VisualPage from '../../src/Component/page/VisualPage';
import styled from 'styled-components';

const BackButton = styled.div`
  position: fixed;
  left: 1.5rem;
  top: 2.2rem;
  transform: scale(2);
  color: azure;
  cursor: pointer;
  z-index: 9;
  opacity: 0.8;

  &:hover{
    opacity: 1;
  }
`

function getContentDetail(props) {
  const { themeMode, detailHandler} = props;
  const [data, setData] = useState({})
  const router = useRouter()
  const id = router.query.id
  const mode = router.query.mode
  
  useEffect(()=> {
    callData(id);
    detailHandler(true); // hide header 
  }, [])

  const goBack = (e)=>{
    try {
    if (e) window.history.back()
    }catch(err){
      throw new Error("Failed to Go Back.")
    }
  }

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
              link : res.data.link
            });
          }else{
            alert('Unvaild Url.')
            router.push('/')
          }
        })
    }catch(err){
        console.log(err)
        throw new Error(err)
    }
  }

  const myLoader = ({ src }) => {
    return `https://d2oispwivf10h4.cloudfront.net/w1024/${src}`
  }

  return (
       <div className = "grid-item-content" style={{ flexDirection: 'column', padding:'0', marginRight: '-1rem'}}>
      <BackButton onClick={goBack}><CgChevronLeft /></BackButton>
      { data.topic === 'poem' || data.topic === 'essay' ||data.topic === 'project'
      ? 
      <DetailPage themeMode ={themeMode} data ={data}/>
      //poem && essay && project COMP
      :
      // visual COMP
      <VisualPage themeMode ={themeMode} data ={data}/>
      }
    </div>
  )
}

export default getContentDetail
