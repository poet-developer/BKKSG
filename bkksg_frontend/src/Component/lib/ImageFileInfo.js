import {Component} from "react";

class ImageFileInfo extends Component{
     constructor(props){
          super(props);
          this.state = {
               key : this.props.key
          }
     }
     render(){
          let data
          if(this.props){
          data = {
               name : this.props.data.name,
               }
          }
          return(
               <span>
               <input readOnly type='text' name='img_index' value = {this.props.index}/>
               <input readOnly type='text' name='img_name' value = {this.props.data.name}/>
               </span>
          )
     }
}

export default ImageFileInfo