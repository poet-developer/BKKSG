import React  from "react";
import TextEditor from '../Component/lib/TextEditor'

// WYSWYG
class Create extends React.Component{
  constructor(props){
    super(props);
    this.state = {
        mode : '',
        resent_id :''
    };

    this.submitHandler = this.submitHandler.bind(this);
    this.handleEditorChange = this.handleEditorChange.bind(this);
  }

  handleEditorChange = (e) => {
    console.log('Content was updated:', e.target.getContent());
    this.setState({
      desc : e.target.getContent()
    })
  }


  submitHandler(e){
    // Send Selected Data for Preview.
    e.preventDefault();
    let color, coverImg;
    console.log(e.target.c.type)
    if(e.target.c.type === 'color'){
      color = e.target.c.value;
    }else{
      coverImg = e.target.c.files[0];
    }
    const formData = new FormData();
               const config = {
                    headers: {'Content-type': 'multipart/form-data'}
                }
                formData.append('author', e.target.author.value);
                formData.append('type', e.target.type.value);
                formData.append('title', e.target.title.value)
                formData.append('desc', this.state.desc)
                formData.append('color',color)
                // An img file's to been used to middleware must be at the end.
                formData.append('coverImg', coverImg);
    this.props.submitHandler(
      formData,config
    ); 
  }

  render(){
    
    return(
        <TextEditor typeList ={this.props.type} profileList ={this.props.profile} handleEditorChange= {this.handleEditorChange} submitHandler = {this.submitHandler} mode = 'create' isOpenPopup ={this.state.isOpenPopup}></TextEditor>
    );
  }
}

export default Create;