import React, { useState }  from "react";
import TextEditor from '../lib/TextEditor'

// Function Component
const Create =  (props) => {
  const [desc, setDesc] = useState('')

  const handleEditorChange = (e) => {
    console.log('Content was updated:', e.target.getContent());
    setDesc(e.target.getContent())
  }

  const submitHandler = (e) => {
    // Send Selected Data for Preview.
    e.preventDefault();
    let color, coverImg;
    if(e.target.c.type === 'color'){
      color = e.target.c.value;
    }else if(e.target.c.type === 'file'){
      coverImg = e.target.c.files[0];
    }
    const formData = new FormData();
                formData.append('author', e.target.author.value);
                formData.append('type', e.target.type.value);
                formData.append('title', e.target.title.value)
                formData.append('desc', desc)
                formData.append('color',color)
                // An img file's to been used to middleware must be at the end.
                formData.append('coverImg', coverImg);
                try{
                  const config = {
                    headers: {'Content-Type': 'multipart/form-data'}
                  }
                  props.submitHandler(
                    formData,config
                  ); 
                } catch(err){
                  console.log(err);
                  alert('fail!');
                }
    
  }
    
    return(
        <TextEditor typeList ={props.type} profileList ={props.profile} handleEditorChange= {handleEditorChange} submitHandler = {submitHandler} mode = 'create'></TextEditor>
    );
}

export default Create