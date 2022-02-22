import { Component } from 'react'
import { Editor } from '@tinymce/tinymce-react';

class TextEditor extends Component{
     constructor(props){
          super(props)
          this.state = {
               mode :''
          }
          
      this.checkMode = (mode) => {
           this.setState({
               mode : mode
           })
          }
     }
     
     componentDidMount(){
          this.checkMode(this.props.mode);
     }
     
     render(){
          let selectProfile;
          let selectType;
          let selectProject;
          let _selectedAuthor;
          let _selectedType;
          let _selectedProject;
          const UPDATE = 'update'

          // let _imginfo;

          
          // 작가 선택 옵션
          selectProfile = this.props.profileList.map((author) => {
               if(this.state.mode === UPDATE){
                    if(author.nickname === this.props.author){
                         _selectedAuthor = author.id;
                    }
               }
               return (
                    <option key={author.id} value={author.id}>
                    {author.nickname}
               </option>
               );
          });
          
          // 장르 선택 옵션
          selectType = this.props.typeList.map((genre) => {
               if(this.state.mode === UPDATE){
                    if(genre.topic === this.props.genre){
                         _selectedType = genre.id;
                    }
               }
               return (
                    <option key={genre.id} value={genre.id}>
                    {genre.topic}
               </option>
               );
          });
          
          // 프로젝트 선택 옵션
          selectProject = this.props.projectList.map((project) => {
               if(this.state.mode === UPDATE){
                    if(project.project === this.props.project){
                         _selectedProject = project.id;
                    }
               }
               return (
               <option key={project.id} value={project.id}>
                    {project.project}
               </option>
               );
          });
          return(
               
          <form onSubmit = {this.props.handleSubmit}>
          {/* 작가  */}
          {
          this.state.mode === UPDATE
          ? <input type='hidden' name='id' value = {this.props.id}/>
          : ''
          }
          <div>
            <label>Title :
          { this.state.mode === UPDATE
          ?
            <input type="text" name="title" 
            onChange={this.props.handleChange}
            defaultValue={this.props.title}
            />
          :
          <input type="text" name="title" placeholder="title" required
               />
          }
            </label>
            <label>Author :
            <select required name="author" value={
                 this.state.mode === UPDATE 
               ? _selectedAuthor
               : undefined
            } onChange={
               this.state.mode === UPDATE
               ? this.props.handleChange
               : undefined
            }>
              <option key="" value="">
                SELECT
              </option>
              {selectProfile}
            </select>
            </label>
            <label>Type : 
            <select required name="type" value={
                 this.state.mode === UPDATE
               ? _selectedType
               : undefined
            } onChange={
               this.state.mode === UPDATE
               ? this.props.handleChange
               : undefined
            }>
              <option key="" value="">
                SELECT
              </option>
              {selectType}
            </select>
            </label>
            <label>Project
            <select required name="project" value={
                 this.state.mode === UPDATE 
               ? _selectedProject
               : undefined
            } onChange={
               this.state.mode === UPDATE
               ? this.props.handleChange
               : undefined
            }>
              <option key="" value="">
                SELECT
              </option>
              {selectProject}
            </select>
            </label>
          </div>
          <br/>
          <Editor
            apiKey="8eb86dp439y3p9j037qkkzyjbjyxmnnau7a1t6axgtbwru4z"
            initialValue={
                    this.state.mode === UPDATE
                    ? this.props.initialValue
                    : "<em>멋진 글 부탁해요!</em>"}
            init={{
              width: 1000,
              height: 500,
              menubar: true,
          //     selector: 'textarea', 
              plugins: [
                'advlist autolink lists link image', 
                'charmap print preview anchor help',
                'searchreplace visualblocks code insertdatetime', 'media table paste wordcount'
              ],
              toolbar:
                'undo redo | formatselect | bold italic | \
                alignleft aligncenter alignright | \
                bullist numlist outdent indent | help',
                
              content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
              a11y_advanced_options: true,

              file_picker_callback: function(callback, value, meta) {
               // Provide file and text for the link dialog
               if (meta.filetype == 'file') {
                 callback('mypage.html', {text: 'My text'});
               }
           
               // Provide image and alt text for the image dialog
               if (meta.filetype == 'image') {
                 callback('myimage.jpg', {alt: 'My alt text'});
               }
           
               // Provide alternative source and posted for the media dialog
               if (meta.filetype == 'media') {
                 callback('movie.mp4', {source2: 'alt.ogg', poster: 'image.jpg'});
               }
             }
                }}
            onChange={this.props.handleEditorChange}
          />
          {/* 이미지 html */}
          {/* {_imginfo} */}
          <input type="submit" value={
               this.state.mode === UPDATE 
               ? "고치기"
               : "만들기"} />
          </form>
          )
     }
}

export default TextEditor