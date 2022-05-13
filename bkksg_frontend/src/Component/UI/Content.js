import React, { useState, useEffect } from "react";
import styled, { ThemeProvider } from "styled-components";
import theme from "../lib/theme";
import Masonry from "react-masonry-css";
import "../../static/css/masonry.css";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";
import Card from "./Card";
import Loader from "../lib/Loader";
import "../../static/css/gridSystem.css";

const Layout = styled.div`
  background-color: ${props => props.theme.colors.main};
`;
//the Biggest Container
const Contents = styled.nav`
  background-color: ${props => props.theme.colors.content};
`;
// the Second big container

const ImgContent = props => {
  const [cards, setCard] = useState([]);
  const [page, setPage] = useState(1);
  const [more, setMore] = useState(true);
  const { mode, themeMode, modalHandler } = props;
  const loadingTime = 700;
  let allCovers = [];
  let preCovers;
  const MasonryInfo = {
    breakPoint: {
      default: 4,
      1300: 3,
      1000: 2,
      700: 1,
    },
    infiniteCount: 10,
  }

  useEffect(() => {
    fetchCards()
  }, []);

  const fetchCards = async(count = MasonryInfo.infiniteCount) => {
    try{
    await axios
      .get("/admin/getType/", {
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
      });
  }catch(err){
      console.log(err)
      throw new Error(err)
  }
}
;

  return (
    <ThemeProvider theme={themeMode ? theme.night : theme.day}>
      <Layout className="grid-item-content" backgroundMode={themeMode}>
        <Contents className = "contents-in-layout" mode={mode}>
          <InfiniteScroll
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
                  modalHandler={is => {
                    modalHandler(is);
                  }}
                />
              ))}
            </Masonry>
          </InfiniteScroll>
        </Contents>
      </Layout>
    </ThemeProvider>
  );
};

export default ImgContent
