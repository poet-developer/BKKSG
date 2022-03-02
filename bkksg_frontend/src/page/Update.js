import { Component } from 'react'
import axios from 'axios'
import TextEditor from '../Component/lib/TextEditor'

// 바로 컨텐트 수정부분을 마우스로 누르면 맨 처음 글자로 단이 움직임


class Update extends Component{
     constructor(props){
          super(props);
          const _data = this.props.data;
          // const blocksFromHTML = convertFromHTML(_data.desc);
          console.log(_data);
          this.state = {
                         id : _data.id,
                         author: _data.author,
                         type: _data.type,
                         title: _data.title,
                         desc : _data.desc,
                         saved_desc : _data.desc,
                         c : _data.cover_src
               }
          this.changeHandler = this.changeHandler.bind(this);
          this.submitHandler = this.submitHandler.bind(this);
          this.handleEditorChange = this.handleEditorChange.bind(this);
     }

     changeHandler(e){
          let _value = e.target.value;
          console.log('값',_value);
          if(e.target){
               this.setState({[e.target.name] : _value });
          }
     }
     
     handleEditorChange = (e) => {
          console.log('Content was updated:', e.target.getContent());
          this.setState({
            saved_desc : e.target.getContent()
          })
        }

     submitHandler(e){
               const _confrimed = window.confirm('수정 할까요?');
               e.preventDefault();
               let color, coverImg;
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
                formData.append('desc', this.state.saved_desc)
                formData.append('id', e.target.id.value)
                formData.append('color',color)
                // An img file's to been used to middleware must be at the end.
                formData.append('coverImg', coverImg);
               if(_confrimed){
                              axios.post('/admin/update_process',formData, config)
                              .then(console.log)
                              .catch(console.log)
                              .finally(window.location.replace("/admin"));
                              // Float a popup
               }else{
                    console.log('거부');
               }
     }



     render(){
          return(
               <label> <h4>Update Your Content!</h4>
               <a href='/admin'>Back to Admin</a>
               <TextEditor title= {this.state.title} author= {this.state.author} genre = {this.state.type} initialValue = {this.state.desc} typeList= {this.props.type} profileList ={this.props.profile} id ={this.state.id} handleEditorChange= {this.handleEditorChange} submitHandler = {this.submitHandler} changeHandler={this.changeHandler} mode = 'update' c = {this.state.c} ></TextEditor>
               </label>
          )
     }
}

export default Update