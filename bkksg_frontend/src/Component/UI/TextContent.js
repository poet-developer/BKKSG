import React, {useState , useEffect} from "react";
import styled, { ThemeProvider } from "styled-components";
import theme from '../lib/theme';
import Masonry from 'react-masonry-css';
import "../../static/css/masonry.css";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from 'axios';
import Card from './Card';
import Loader from '../lib/Loader';
import MasonryInfo from '../lib/MasonryInfo'

const Layout = styled.div`
  grid-area: content;
  height: 100%;
  width: 100vw;
  z-index: 2;
  padding: 1rem;
  background-color: ${props => props.theme.colors.main};
  display : flex;
  justify-content: center;
  padding-bottom: 0.5rem;
`
//the Biggest Container
const Content =  styled.nav`
  flex: 0 1 320px;
  width: 100vw;
  min-height: 100vh;
  height: 100%;
  margin-left: -1.2rem;
  background-color: ${props=> props.theme.colors.content};
  padding-bottom: 0.5rem;
  
`
// the Second big container

const TextContent = (props) => {
  const [cards, setCard] = useState([]);
  const [page, setPage] = useState(1);
  const [more, setMore] = useState(true);
  const {mode, pullUp, themeMode, modalHandler} = props;
  const loadingTime = 500;
  let allCovers = [];
  let preCovers;
  let breakpointColumnsObj = MasonryInfo.breakPoint;
  
  useEffect(() => {
    fetchCards();
  }, [])


  const fetchCards = (count = MasonryInfo.infiniteCount) => {
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
                  topic : content.topic,
                  src : content.cover_src
                }
              });
              preCovers = allCovers.slice((page-1)*count,(page-1)*count+count);

              setTimeout(()=> {
                setCard([...cards, ...preCovers]);
                setPage(page+1);
                if(allCovers.length<= (page-1)*count+count){
                  setMore(false);
                }
              },loadingTime);
      });
    };
  
    
  return (
            <ThemeProvider theme = {
              themeMode
              ? theme.night
              : theme.day}>
             <Layout>
               <Content pullUp = {pullUp} mode = {mode}>
                <InfiniteScroll
                  dataLength={cards.length}
                  next={fetchCards}
                  hasMore={more}
                  loader={<Loader/>}>
                  <Masonry
                      breakpointCols={breakpointColumnsObj}
                      className="my-masonry-grid"
                      columnClassName="my-masonry-grid_column">
                      {cards.map((card) => (
                          <Card themeMode={themeMode} key={cards.indexOf(card)} data = {card} mode = {mode}modalHandler = {function(is){
                            modalHandler(is);
                          }}></Card>
                      ))}
                  </Masonry>
                </InfiniteScroll>
              </Content>
              </Layout>
            </ThemeProvider>
  );
};

export default TextContent