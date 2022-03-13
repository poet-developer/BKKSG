import React, { useState }  from "react";
import TextEditor from '../lib/TextEditor'

// Function Component
export default (props) => {
  const [desc, setDesc] = useState('')

  const handleEditorChange = (e) => {
    console.log('Content was updated:', e.target.getContent());
    setDesc(e.target.getContent())
  }

  const submitHandler = (e) => {
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
                formData.append('desc', desc)
                formData.append('color',color)
                // An img file's to been used to middleware must be at the end.
                formData.append('coverImg', coverImg);
    props.submitHandler(
      formData,config
    ); 
  }
    
    return(
        <TextEditor typeList ={props.type} profileList ={props.profile} handleEditorChange= {handleEditorChange} submitHandler = {submitHandler} mode = 'create'></TextEditor>
    );
}