import styled from 'styled-components'

const Img = styled.img`
 max-width: 50vw;
`


export default (props) => {
          const _data = props.data
          return(
               <div className = "Preview">
               <h1>Preview</h1>
               <label>Cover:<br/> 
               { _data.type == 3 || _data.type == 4
               ? <Img src = {`https://d2oispwivf10h4.cloudfront.net/w330/${_data.cover_src}`}/>
               : <input type='color' value ={_data.cover_src} readOnly/>
               }
               {props.imgSrc
               ?<Img src = {props.imgSrc}/>
               :''
               }
               </label>
               <label>
               <h2>제목 : {_data.title}</h2>
               <div dangerouslySetInnerHTML={{__html: _data.desc }} />
               <hr/>
               </label>
               </div> 
               )
     
}