import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import Masonry from "react-masonry-css";
import Card from "./Card";
import Loader from "../lib/Loader";
import SessionStorage from "../lib/SessionStorage";

const Layout = styled.div`
  background-color: ${(props) => props.theme.colors.main};
`;
//the Biggest Container
const Contents = styled.nav`
  background-color: ${(props) => props.theme.colors.content};
`;
// the Second big container

const Content = (props) => {
  const { mode, themeMode, detailHandler, setCount, scrollPosition, data } =
    props;
  const defaultCount = 10;
  const loadingTime = 600;
  const [cards, setCard] = useState([]);
  const [page, setPage] = useState(1);
  const [more, setMore] = useState(false);
  const [loaded, setLoadState] = useState(false);
  const [infiniteCount, setDefaultCount] = useState(
    setCount ? Number(setCount) : defaultCount,
  ); // 스크롤 기억하기 조건 1.
  const pageEnd = useRef(null);
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
  };

  useEffect(() => {
    detailHandler(false);
    setMore(true);
    if (data.length === cards.length) setLoadState(true);
  }, [cards.length]);

  const loadMore = () => {
    setPage(page + 1);
  };

  useEffect(() => {
    if (more) {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            fetchCards(MasonryInfo.infiniteCount, data);
            loadMore();
            if (allCovers.length <= page * MasonryInfo.infiniteCount) {
              observer.unobserve(pageEnd.current);
              setLoadState(false);
            }
            setMore(false);
          }
        },
        { threshold: 1 },
      );
      observer.observe(pageEnd.current);
    }
  }, [more]);

  const fetchCards = async (count, data) => {
    try {
      allCovers = await data.map((content) => {
        return {
          id: content.id,
          title: content.title,
          desc: content.description,
          topic: content.topic,
          src: content.cover_src,
        };
      });

      preCovers = data.slice((page - 1) * count, (page - 1) * count + count);
      setTimeout(() => {
        setCard([...cards, ...preCovers]);
        setMore(true);
        if (allCovers.length <= page * count) setMore(false);
      }, loadingTime);

      movedScroll().then(() => {});
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  };

  const movedScroll = async () => {
    if (SessionStorage.getItem("saved") !== null) {
      setTimeout(() => {
        window.scrollTo(0, Number(scrollPosition));
        SessionStorage.setItem("cc", defaultCount);
        SessionStorage.removeItem("sp");
      }, 1200);
      SessionStorage.removeItem("saved");
    }
  };

  return (
    <Layout className="grid-item-content" backgroundMode={themeMode}>
      <Contents className="contents-in-layout" mode={mode}>
        <Masonry
          breakpointCols={MasonryInfo.breakPoint}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {cards.map((card) => (
            <Card
              themeMode={themeMode}
              key={cards.indexOf(card)}
              data={card}
              mode={mode}
              detailHandler={(is) => {
                detailHandler(is);
              }}
              infiniteCount={cards.length}
            />
          ))}
        </Masonry>
        <span style={loaded ? { display: "none" } : { display: "auto" }}>
          <Loader />
        </span>
        <div ref={pageEnd} />
      </Contents>
    </Layout>
  );
};
export default Content;
