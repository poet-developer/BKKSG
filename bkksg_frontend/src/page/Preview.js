import {Component} from 'react';

class Preview extends Component{

     constructor(props){
          super(props);
          this.state = {
               mode : ''
          }
     }


     render(){
          const _data = this.props.data
          const _author = this.props.profile[_data.author-1].nickname;
          return(
               <div className = "Preview">
               <h1>Preview</h1>
               <label>Cover:<br/> 
               { _data.type == 3 || _data.type == 4
               ? <img src = {'/images/covers/'+_data.cover_src}/>
               : <input type='color' value ={_data.cover_src} readOnly/>
               }
               </label>
               <label>
               <h2>제목 : {_data.title}</h2>
               <div dangerouslySetInnerHTML={{__html: _data.desc }} />
               <hr/>
               <em>* 글쓴이 : {_author}</em>
               </label>
               </div> 
               )
     }
}

export default Preview