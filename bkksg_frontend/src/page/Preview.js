import {Component} from 'react';
import axios from 'axios'

class Preview extends Component{

     constructor(props){
          super(props);
          this.state = {
               mode : ''
          }
     }

     createMarkup() {
          return {__html: this.props.data};
        }

     render(){
          return(
               <div className = "Preview">
               <h2>Preview</h2>
               <div dangerouslySetInnerHTML={{__html: this.props.data.desc }} />
               </div>
          )
     }
}

export default Preview