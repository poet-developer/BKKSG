import Parser from "html-react-parser";
import SearchChapter from "./SearchChapter";

/**
 * For SearchMode
 * 검색 결과물 보여주는 UI
 *  poem & essay 와 visul & project 분기해서 스타일 달리할 것.
 */

const SearchResults = (props) => {
  const { data } = props;
  const styles = {
    borderRadius: "1rem",
    height: "100%",
    width: "100%",
    objectFit: "cover",
  };
  return (
    <>
      {data.topic === "poem" ||
      data.topic === "essay" ||
      data.topic == "project" ? (
        <div className="result-item-container">
          <SearchChapter
            cover={data.cover_src}
            topic={data.topic}
            title={data.title}
          />{" "}
          <br />
          <div className="result-item-desc">
            {Parser(data.description, {
              replace: (domNode) => {
                if (domNode.name === "img") return <></>;
              },
            })}
          </div>
        </div>
      ) : (
        <div className="result-item-container">
          <h2 className="result-item-image-title">
            {data.title}
            <br />| {data.topic}
          </h2>
          <br />
          <img
            style={styles}
            alt={data.title}
            src={`${process.env.NEXT_PUBLIC_REACT_AWS_CLOUDFRONT}w1024/${data.cover_src}`}
          />
        </div>
      )}
    </>
  );
};

export default SearchResults;
