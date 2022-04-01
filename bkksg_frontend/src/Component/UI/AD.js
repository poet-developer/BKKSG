import React, {useState , useEffect, useRef} from "react";
import styled from "styled-components";
import theme from '../lib/theme';

const ADFrame = styled.div`   
     width: 100%;
     height: 20vh;
     border: 1px solid black;
     background : white;
     margin-top: 3rem;
     border-radius : 1rem;
`    
  const AD = (count = 10) => {
//     axios
//          .get('/admin')
//          .then((res) => {
//               covers = res.data.contents.map((content) => {
//                    return {id: content.id,
//                          title : content.title,
//                          nicknamae : content.nickname,
//                          topic : content.topic,
//                          src : content.cover_src
//                         }
//               })
//          setImage([...covers]);
//          });
//     };
    
  return (
            <>
             <ADFrame></ADFrame>
            </>
  );
};

export default AD