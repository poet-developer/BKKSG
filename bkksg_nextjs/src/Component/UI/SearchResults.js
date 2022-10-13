import ImageLoader from "../lib/imageLoader"
import Parser from 'html-react-parser';
import Chapter from "./Chapter";

const SearchResults = (props) => {
     const  {data} = props;
     return (
          <>
          { data.topic === 'poem' || data.topic === 'essay' || data.topic == 'project' ?
          <div className= "result-item-container"> 
                      <Chapter cover={data.cover_src} topic={data.topic} title = {data.title}/> <br/>
                      <div className="result-item-desc">
                      {Parser(data.description, {
                          replace: (domNode) => {
                            if (domNode.name === 'img') return <></>
                          }
                        })}
                      </div>
          </div>
          :
          <div className= "result-item-container"> 
                      <h2 className="result-item-image-title">{data.title}
                      <br/>| {data.topic}</h2><br/>
                      <ImageLoader
                      imageUrl= {`${process.env.NEXT_PUBLIC_REACT_AWS_CLOUDFRONT}w1024/${data.cover_src}`} alt = {data.title}
                      mode = 'search'
                      desc = {data.description}
                      /> 
          </div>
          }
          </>
     )
}

export default SearchResults