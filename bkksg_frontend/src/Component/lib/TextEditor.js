import React, { Component } from 'react'
import { Editor } from '@tinymce/tinymce-react';

class TextEditor extends Component{
     constructor(props){
          super(props)
          this.state = {
               mode :this.props.mode, //create or update
               coverType : '',
               isOpenInput: false,
               checked : this.props.public,
          }
          
      this.checkMode = (mode) => {
           if(mode === 'update'){
                this.setState({
                     isOpenInput : true
                }).bind(this);
                this.openInput(this.props.genre,mode);
           }
          }
          
          this.openInput = this.openInput.bind(this); // binding using 2 variables.
          this.closeInput = this.closeInput.bind(this);
          this.changeInput = this.changeInput.bind(this);
     }
     
     componentDidMount(){
          this.checkMode(this.props.mode);
          console.log(this.props.public);
     }

     changeInput(e){
          let _coverValue = Number(e.target.value);
          let _coverInput;
          
          if(_coverValue === 1 || _coverValue === 2){
                    _coverInput = <input type = 'color' name ='c'/>
          }else if(_coverValue === 3 || _coverValue === 4){
                    _coverInput = <input type = 'file' name ='c'/>
               }       
          

          this.setState({
               isOpenInput: true,
               coverType : _coverInput,
           })
     }

     openInput(e){
          let _coverValue;
          let _coverInput;
          let _UPDATE = 'update';
          let _CREATE = 'create';
          let _mode = this.state.mode;

          if(_mode === _CREATE){
              _coverValue = Number(e.target.value);
          }else{
               _coverValue = e;
          }
          // According to this mode,  e'Value is gonna be changed. 
          
          if(_coverValue === 1){
               if(_mode === _UPDATE){
                    _coverInput = <input type = 'color' name ='c' defaultValue ={this.props.c} />
               }else{
                    _coverInput = <input type = 'color' name ='c'/>
               }
          }else if(_coverValue === 2){
               if(_mode === _UPDATE){
                    _coverInput = <input type = 'color' name ='c' defaultValue ={this.props.c}/>
               }else{
                    _coverInput = <input type = 'color' name ='c'/>
               }
          }else if(_coverValue === 3){
               if(_mode === _UPDATE){
                    _coverInput = <label><em>* Current | {this.props.c}</em> 
                    <input type ='hidden' name = 'img_id' value = {this.props.c}/>
                    <br/><label>Change | <input type = 'file' name ='c'/></label></label>
               }else{
                    _coverInput = <input type = 'file' name ='c'/>
               }       
          }else if(_coverValue === 4){
               if(_mode === _UPDATE){
                    _coverInput = <label><em>* Current | {this.props.c}</em>
                    <input type ='hidden' name = 'img_id' value = {this.props.c}/> <br/><label>Change | <input type = 'file' name ='c'/></label></label>
               }else{
                    _coverInput = <input type = 'file' name ='c'/>
               }  
          }

          // 선택 옵션 받아옴.
          this.setState({
              isOpenInput: true,
              coverType : _coverInput,
          })
      }
   
      closeInput(){
          this.setState({
              isOpenInput: false,
          })
      }
     
     render(){
          let selectType;
          let _selectedType;
          let _mode =  this.state.mode;
          const UPDATE = 'update'
          const apiKey = process.env.REACT_APP_TINY_EDITOR
          // 장르 선택 옵션
          selectType = this.props.typeList.map((genre) => {
               if(_mode === UPDATE){
                    if(genre.id === this.props.genre) _selectedType = genre.id;
                    // filtering target.
               }
               return (
                    <option key={genre.id} value={genre.id} >
                    {genre.topic}
               </option>
               );
          });
          
          return(
          
          <label>
          <form onSubmit = {this.props.submitHandler}>
          {
               _mode === UPDATE
               ? <input type='hidden' name='id' value = {this.props.id}/>
               : ''
          }
          <div>
            <label>Title :
          { _mode === UPDATE
          ?
          <input type="text" name="title" 
            onChange={this.props.changeHandler}
            defaultValue={this.props.title}
            />
            :
            <input type="text" name="title" placeholder="title" required/>
          }
          </label>
            <label>Type : 
            <select required name="type" value={
                 _mode === UPDATE
                 ? _selectedType
                 : undefined
               } onChange={
                    _mode === UPDATE
                    ? function(e){
                         this.props.changeHandler(e);
                         this.changeInput(e)
                    }.bind(this) // update mode
                    : this.openInput // create mode
               }>
              <option key="" value="">
                SELECT
              </option>
              {selectType}
            </select>
            </label>
            {this.state.isOpenInput
          ? <label><br/>Cover: {this.state.coverType}</label>
          : ''
           }

          <label> Public :
          { _mode === UPDATE
          ?
          <input type="checkbox" name="public" 
            onChange={function(e){
               this.state.checked = !this.props.public;
               this.props.changeHandler(e);
          }.bind(this)}
            defaultChecked={this.state.checked}
            value={this.state.checked}
            />
            :
            <input type="checkbox" name="public" value={this.state.checked} onChange={function(){
               this.props.publicHandler();
               }.bind(this)}/>
          }
          </label>
          </div>
          <br/>
          <Editor
            apiKey = {apiKey}
            initialValue={
                 _mode === UPDATE
                 ? this.props.initialValue
                 : "<em>멋진 글 부탁해요!</em>"}
            init={{
                 width: 1000,
                 height: 500,
                 menubar: true,
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
          }}
            onChange={this.props.handleEditorChange}
          />
          {/* 이미지 html */}
          {/* {_imginfo} */}
          <input type="submit" value={
               _mode === UPDATE 
               ? "고치기"
               : "만들기"} />
          </form>
           </label>
          )
     }
}

export default TextEditor