import { useState, useEffect} from 'react';
import { useRouter } from 'next/router'
import React from "react"
import DetailPage from '../../src/Component/page/DetailPage';
import axios from 'axios'
import Error from '../../src/Component/page/Error';
import { CgChevronLeft } from "react-icons/cg";
import VisualPage from '../../src/Component/page/VisualPage';
import styled from 'styled-components';
import SessionStorage from '../../src/Component/lib/SessionStorage';

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

const DetailContainer = styled.div`
animation: modal-show 0.3s;
flex-direction: column; 
padding: 0;
marginRight: -1rem;

`

function getContentDetail(props) {
  const { themeMode, detailHandler} = props;
  const [data, setData] = useState({})
  const router = useRouter()
  const id = router.query.id
  const mode = router.query.mode
  const from = router.query.fr
  useEffect(()=> {
    SessionStorage.setItem('sp',router.query.sp);
    SessionStorage.setItem('cc',router.query.cc);
    SessionStorage.setItem('saved','saved');
    callData(id);
    detailHandler(true); // hide header 
  }, [])

  const goBack = (e)=>{
    try {
    if (e) {
      if(from !== 'home') router.push(`/${mode}`)
      else router.push('/')
    }
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

  return (
       <DetailContainer className = "grid-item-content">
      <BackButton onClick={goBack}><CgChevronLeft /></BackButton>
      {/* 같은 뒤로가기 버튼  */}
      { data.topic === 'poem' || data.topic === 'essay' ||data.topic === 'project'
      ? 
      <DetailPage themeMode ={themeMode} data ={data}/> //poem && essay && project COMP
      :
      <VisualPage themeMode ={themeMode} data ={data}/>// visual COMP
      }
    </DetailContainer>
  )
  
}

export default getContentDetail
