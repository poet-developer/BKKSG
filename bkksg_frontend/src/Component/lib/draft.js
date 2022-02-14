import React, { useState } from "react";
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import EditorContent from './EditorContent'
import styled from 'styled-components';
import ImageFileInfo from './ImageFileInfo'
import sendImgToServer from './img_process'

const MyBlock = styled.div`
    .wrapper-class{
        width: 80%;
        margin: 0 auto;
        margin-bottom: 4rem;
    }
     .editor {
     height: 500px !important;
     border: 1px solid #f1f1f1 !important;
     padding: 5px !important;
     border-radius: 2px !important;
     }
`;


// WYSWYG
class Draft extends React.Component{
  constructor(props){
    super(props);
    this.state = {
        imgKey : 0,
        editorState : EditorState.createEmpty(),
        uploadedImages : [],
    };
    
    this.onChange = 
    editorState => {
      this.setState(editorState)
    }

    this.uploadCallback = file => {
      sendImgToServer(file);
      const imgObj = {
        file: file,
      }
      imgObj.file.index = this.state.imgKey;
      this.state.uploadedImages.push(imgObj);
      this.state.imgKey ++;
      this.setState({uploadedImages : this.state.uploadedImages})
      return new Promise(
        //서버로 이미지를 저장함 미들웨어 사용. url:port
        (resolve, reject) => {
          resolve({ data: { link: `http://localhost:3001/${file.name}` }});
        }
      );
    }

    this.onEditorStateChange = (editorState) => {
      this.setState({
        editorState,
      });
    };

  }

  handleSubmit(e){
    // 미리보기 데이터를 전송할 것.
    e.preventDefault();
    this.props.onSubmit(
      e.target.author.value,
      e.target.type.value,
      e.target.title.value,
      e.target.desc.value
    );
    // alert( 'Mode is');
  }

  render(){
    let selectProfile;
    let selectType;
    let _imginfo;

    // 작가 선택 옵션
    selectProfile = this.props.profile.map((author) => {
      return (
        <option key={author.id} value={author.id}>
          {author.nickname}
        </option>
      );
    });

     // 장르 선택 옵션
    selectType = this.props.type.map((genre) => {
      return (
        <option key={genre.id} value={genre.id}>
          {genre.topic}
        </option>
      );
    });

    // 이미지 파일 변환을 위해 이미지 파일 정보 추출
    // 첨부된 이미지 파일정보 서버에 전송 -> tmp저장용 

    if(this.state.uploadedImages){
      _imginfo = this.state.uploadedImages.map((imgData) => {
        return <ImageFileInfo key = {imgData.file.index} index = {imgData.file.index} data = {imgData.file} localSrc = {imgData.localSrc}></ImageFileInfo>
      });
    }
    
    return(
      <MyBlock>
        <form onSubmit = {this.handleSubmit.bind(this)}>
          {/* 작가  */}
          <div>
            <span className="createItem">Author</span>
            <select name="author">
              <option key="" value="">
                SELECT
              </option>
              {selectProfile}
            </select>
            <span className="createItem">Type</span>
            <select name="type" className="type">
              <option key="" value="">
                SELECT
              </option>
              {selectType}
            </select>
          </div>
            <span className="createItem">Title</span>
            <input type="text" name="title" placeholder="title" required />
          
      <Editor 
        editorState={this.state.editorState}
        onChange={this.onChange}
        wrapperClassName="wrapper-class
        "
        editorClassName="editor"
        toolbarClassName="toolbar-class"      
        toolbar={{
            list: { inDropdown: true },
            textAlign: { inDropdown: true },
            link: { inDropdown: true },
            history: { inDropdown: false },
            image: { 
            uploadCallback: this.uploadCallback,
            inputAccept: 'image/gif,image/jpeg,image/jpg,image/png,image/svg'
          }
      }}

      placeholder="멋진 글 부탁드려요."
      localization={{
           locale: 'ko',
      }}
      onEditorStateChange={this.onEditorStateChange}
      />
      {/* 이미지 html */}
      {_imginfo}

      {/* html content textarea */}
      <EditorContent key = {this.props.key} content = {convertToRaw(this.state.editorState.getCurrentContent())}></EditorContent>

      <input type="submit" value="만들기" />
      </form>
      </MyBlock>
    );
  }
}

export default Draft;