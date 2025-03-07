import styled from "styled-components";

/**
 * For SearchMode
 * 검색 창에 제목과 글종류 보여주는 UI
 * poem&essay / visual&project 분기
 */

const ColorSticker = styled.div`
  position: relative;
  flex: 0 0 12rem;
  background: ${(props) => props.cover};

  @media screen and (max-width: 600px) {
    flex: 0 0 100%;
  }
  display: flex;
  align-items: center;
`;

const ProjectSticker = styled.div`
 position: relative;
 flex: 0 0 12rem;
 background-image: ${(props) => `url(https://d2oispwivf10h4.cloudfront.net/w1024/${props.cover}`});
 background-size: cover;
 background-position: center;
 background-repeat: no-repeat;

 @media screen and (max-width: 600px) {
     flex: 0 0 100%;
     }
display: flex;
align-items: center;
`;

const Title = styled.div`
  flex: 0 0 10rem;
  margin-left: 1rem;
`;

const SearchChapter = (props) => {
  const { cover, topic, title } = props;

  return (
    <>
      {topic == "poem" || topic == "essay" ? (
        <ColorSticker cover={cover}>
          <Title>
            {title}
            <br />| {topic}
          </Title>
        </ColorSticker>
      ) : (
        <ProjectSticker cover={cover}>
          <Title>
            {title}
            <br />| {topic}
          </Title>
        </ProjectSticker>
      )}
    </>
  );
};

export default SearchChapter;
