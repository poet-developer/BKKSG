import {Component} from 'react';

class Preview extends Component{

     constructor(props){
          super(props);
          this.state = {
               mode : ''
          }
     }


     render(){
          return(
               <div className = "Preview">
               <h1>Preview</h1>
               
               <label>
               <h2>제목 : {this.props.data.title}</h2>
               <div dangerouslySetInnerHTML={{__html: this.props.data.desc }} />
               </label>
               </div> 
               )
     }
}

export default Preview