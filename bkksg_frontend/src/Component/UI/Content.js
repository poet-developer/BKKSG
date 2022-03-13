import React from "react";
import styled from "styled-components";

const Content = styled.div`
grid-area: content;
height: 130vh;
width: 100vw;
margin-bottom: 6.5rem;
z-index: 2;
`


const Contents = () => {
  return (
           <>
             <Content>Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque exercitationem fuga accusantium illum labore fugiat odit facere totam ab eos, et harum eveniet dignissimos nihil quae magni quia provident veritatis.</Content>
            </>
  );
};

export default Contents