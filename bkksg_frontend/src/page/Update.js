import { Component } from 'react'
import axios from 'axios'
import sendImgToServer from '../Component/lib/img_process'
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
                         project : _data.project,
                         saved_desc : ''
                         // imgKey : 0,
                         // editorState : EditorState.createWithContent(customContentStateConverter(
                         //      ContentState.createFromBlockArray(
                         //           blocksFromHTML.contentBlocks, blocksFromHTML.entityMap
                         //      )
                         //      )),
                         // uploadedImages : [],

               }
          this.handleChange = this.handleChange.bind(this);
          this.handleSubmit = this.handleSubmit.bind(this);
          this.handleEditorChange = this.handleEditorChange.bind(this);
         
          this.onChange = 
          editorState => {
          this.setState(editorState)

          this.uploadCallback = file => {
               console.log(file);
               sendImgToServer(file);
               const imgObj = {
                 file: file,
               }
               // imgObj.file.index = this.state.imgKey;
               // this.state.uploadedImages.push(imgObj);
               // // this.state.imgKey ++;
               this.setState({uploadedImages : this.state.uploadedImages})
               return new Promise(
                 //서버로 이미지를 저장함 미들웨어 사용. url:port
                 (resolve, reject) => {
                   resolve({ data: { link: `http://localhost:3001/${file.name}` }});
                 }
               );
             }
         
     }
    }

     handleChange(e){
          let _value = e.target.value;
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

     handleSubmit(e){
               const _confrimed = window.confirm('수정 할까요?');
               e.preventDefault();
               if(_confrimed){
                              axios.post('/admin/update_process', {
                                   author: e.target.author.value,
                                   type: e.target.type.value,
                                   title: e.target.title.value,
                                   desc: this.state.saved_desc,
                                   project : e.target.project.value,
                                   id: e.target.id.value
                                   })
                              .then(window.location.replace("/admin"));
               }else{
                    console.log('거부');
               }
     }



     render(){
          return(
               <label> <h4>Update Your Content!</h4>
               <a href='/admin'>Back to Admin</a>
               <TextEditor title= {this.state.title} author= {this.state.author} genre = {this.state.type} initialValue = {this.state.desc} project = {this.state.project} typeList= {this.props.type} profileList ={this.props.profile} projectList = {this.props.project} id ={this.state.id} handleEditorChange= {this.handleEditorChange} handleSubmit = {this.handleSubmit} handleChange={this.handleChange} mode = 'update'></TextEditor>
               </label>
          )
     }
}

export default Update