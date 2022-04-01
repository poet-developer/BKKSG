import React from "react";
import styled from "styled-components";
import theme from '../lib/theme';
import MultiClamp from 'react-multi-clamp';

const Card =  styled.div`
    width: 100%;
    height: 150px;
    margin-bottom: 1rem;
    background-color: lavender;
    display: flex;
    align-items: center;

    background-size: cover;
    background-position:center;
    background-repeat: no-repeat;

    border-radius: 1rem;

`

const Anchor = styled.a`{
  text-decoration: none;
  color:white;
}`

const DescSquare = styled.div`
  display: flex;
  align-items: center;
  padding-top:0.2rem;
  width:100%;
  height:40%;
  background-color: ${theme.colors.main};
  opacity: 0.9;
`

const Desc = styled.span`
  line-height: 1.3rem;
  max-height: 5rem;
  flex: 1 1 auto;
  font-size: 1rem;
  margin: 0 2rem 0 0;

  color: whitesmoke;
`

const Title = styled.h2`
  font-size: 2.5rem;
  padding: 0 2rem;
  color:white;
`

const WritingCard = (props) => {

  return (
              <Card>
              <Anchor href="#"><DescSquare className="text-sq"><Title>Title</Title><Desc><MultiClamp ellipsis="..." clamp={3}>ratione, vel quibusdam cum excepturi aliquid quo dicta nostrum officiis enim sint id architecto mollitia amet? Nulla unde reiciendis dolores cupiditate placeat, tenetur veritatis iste qui sint perferendis voluptatibus accusantium odio eveniet nobis commodi dicta eius! Sapiente culpa distinctio alias, ullam ea velit. Accusantium voluptatibus voluptate, ex dolore similique necessitatibus laboriosam magnam officiis aperiam. Non ullam minus cupiditate mollitia quia voluptates illo o</MultiClamp></Desc></DescSquare></Anchor>
              </Card> 
  );
};

export default WritingCard