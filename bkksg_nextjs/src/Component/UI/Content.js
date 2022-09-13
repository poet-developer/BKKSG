import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Masonry from "react-masonry-css";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";
import Card from "./Card";
import Loader from "../lib/Loader";
import SessionStorage from "../lib/SessionStorage";

const Layout = styled.div`
  background-color: ${props => props.theme.colors.main};
`;
//the Biggest Container
const Contents = styled.nav`
  background-color: ${props => props.theme.colors.content};
`;
// the Second big container

const Content = props => {
  const { mode, themeMode, detailHandler, modalHandler, setCount, scrollPosition } = props;
  const defaultCount = 10;
  const loadingTime = 900;
  const [cards, setCard] = useState([]);
  const [page, setPage] = useState(1);
  const [more, setMore] = useState(true);
  const [infiniteCount, setDefaultCount] = useState( setCount ? Number(setCount) : defaultCount)// 스크롤 기억하기 조건 1.
  let allCovers = [];
  let preCovers;
  const MasonryInfo = {
    breakPoint: {
      default: 4,
      1300: 3,
      1000: 2,
      700: 1,
    },
    infiniteCount: infiniteCount,
  }

  useEffect(() => {
    fetchCards()
    detailHandler(false);
    // setDefaultCount(2);
    console.log('현재 카드 개수',setCount);
  }, []);

  const fetchCards = async(count = MasonryInfo.infiniteCount) => {
    try{
    await axios
      .get("/api/getTypeContents/", {
        params: { mode: mode },
      })
      .then((res) => {
        allCovers = res.data.contents.map((content) => {
          return {
            id: content.id,
            title: content.title,
            desc: content.description,
            topic: content.topic,
            src: content.cover_src,
          };
        });
        preCovers = allCovers.slice(
          (page - 1) * count,
          (page - 1) * count + count
        );

        setTimeout(() => {
          setCard([...cards, ...preCovers]);
          setPage(page + 1);
          if (allCovers.length <= (page - 1) * count + count) setMore(false);
        }, loadingTime);
      })
      .finally(
        () => {
          if(SessionStorage.getItem('saved') !== null){
            setTimeout(() => {
              window.scrollTo(0, Number(scrollPosition));
              SessionStorage.setItem('cc', defaultCount);
              SessionStorage.removeItem('sp');
            }, 1200);
            SessionStorage.removeItem('saved');
          }
        }
      );
  }catch(err){
      console.log(err)
      throw new Error(err)
  }
}

  return (
      <Layout className="grid-item-content" backgroundMode={themeMode}>
        <Contents className = "contents-in-layout" mode={mode}>
          <InfiniteScroll
          style={{overflow:"hidden"}}
            dataLength={cards.length}
            next={fetchCards}
            hasMore={more}
            loader={<Loader/>}
          >
            <Masonry
              breakpointCols={MasonryInfo.breakPoint}
              className="my-masonry-grid"
              columnClassName="my-masonry-grid_column"
            >
              {cards.map(card => (
                <Card
                  themeMode={themeMode}
                  key={cards.indexOf(card)}
                  data={card}
                  mode={mode}
                  detailHandler={is => {
                    detailHandler(is);
                  }}
                  modalHandler={modalHandler}
                  infiniteCount={
                    cards.length
                  }
                />
              ))}
            </Masonry>
          </InfiniteScroll>
        </Contents>
      </Layout>
  );
};

export default Content
