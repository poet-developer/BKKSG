import React, {useState , useEffect} from "react";
import styled from "styled-components";
import night from '../lib/night';
import day from '../lib/day';
import Masonry from 'react-masonry-css';
import "../../static/css/masonry.css";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from 'axios';
import Card from './Card';
import Loader from '../lib/Loader';

const Layout = styled.div`
  grid-area: content;
  height: 100%;
  width: 100vw;
  z-index: 2;
  background-color: ${props => props.backgroundMode ? day.colors.main : night.colors.main};
  display : flex;
  justify-content: center;
  margin-top : -3rem;
`
//the Biggest Container
const Content =  styled.nav`
  flex: 0 1 auto;
  min-height: 100vh;
  height: 100%;
  transition: 1s;
  background-color: rgba(255,255,255,0.3);
  padding-top: 4rem;
  padding-left: ${props => props.pullUp ? '3rem' : '0'};
  margin-right: ${props => props.pullUp ? '7rem' : '0'};
  
`
// the Second big container

const TextContent = (props) => {
  const [cards, setImage] = useState([]);
  const [page, setPage] = useState(1);
  const [more, setMore] = useState(true);
  const {mode, pullUp, themeMode} = props;
  let allCovers = [];
  let preCovers;
  let breakpointColumnsObj ={
    default: 4,
      1700: 3,
      1200: 2,
      900: 1,
      }
  
  useEffect(() => {
    fetchImages();
  }, [])


  const fetchImages = (count = 10) => {
    axios
         .get('/admin/getType',{
           params : {mode: mode}
         })
         .then((res) => {
              allCovers = res.data.contents.map((content) => {
                return {
                  id: content.id,
                  title : content.title,
                  desc : content.description,
                  nickname : content.nickname,
                  topic : content.topic,
                  src : content.cover_src
                }
              });
              preCovers = allCovers.slice((page-1)*count,(page-1)*count+count);

              setTimeout(()=> {
                setImage([...cards, ...preCovers]);
                setPage(page+1);
                if(allCovers.length<= (page-1)*count+count){
                  setMore(false);
                }
              },1000);
      });
    };
  
    
  return (
            <>
             <Layout backgroundMode = {themeMode}>
               <Content pullUp = {pullUp} mode = {mode}>
                <InfiniteScroll
                  dataLength={cards.length}
                  next={fetchImages}
                  hasMore={more}
                  loader={<Loader/>}>
                  <Masonry
                      breakpointCols={breakpointColumnsObj}
                      className="my-masonry-grid"
                      columnClassName="my-masonry-grid_column">
                      {cards.map((card) => (
                          <Card key={cards.indexOf(card)} data = {card} mode = {mode}></Card>
                      ))}
                  </Masonry>
                </InfiniteScroll>
              </Content>
              </Layout>
            </>
  );
};

export default TextContent