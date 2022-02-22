import React  from "react";
import TextEditor from '../Component/lib/TextEditor'
import ImageFileInfo from '../Component/lib/ImageFileInfo'
import sendImgToServer from '../Component/lib/img_process'

// WYSWYG
class Draft extends React.Component{
  constructor(props){
    super(props);
    this.state = {
        imgKey : 0,
        uploadedImages : [],
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEditorChange = this.handleEditorChange.bind(this);
  
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
  }

  handleEditorChange = (e) => {
    console.log('Content was updated:', e.target.getContent());
    this.setState({
      desc : e.target.getContent()
    })
  }

  handleSubmit(e){
    // 미리보기 데이터를 전송할 것.
    e.preventDefault();
    this.props.handleSubmit(
      e.target.author.value,
      e.target.type.value,
      e.target.title.value,
      this.state.desc,
      e.target.project.value
    );
  }

  render(){
    

    // 이미지 파일 변환을 위해 이미지 파일 정보 추출
    // 첨부된 이미지 파일정보 서버에 전송 -> tmp저장용 

    // if(this.state.uploadedImages){
    //   _imginfo = this.state.uploadedImages.map((imgData) => {
    //     return <ImageFileInfo key = {imgData.file.index} index = {imgData.file.index} data = {imgData.file} localSrc = {imgData.localSrc}></ImageFileInfo>
    //   });
    // }
    
    return(
        <TextEditor typeList ={this.props.type} profileList ={this.props.profile} projectList ={this.props.project} handleEditorChange= {this.handleEditorChange} handleSubmit = {this.handleSubmit} mode = 'create'></TextEditor>
    );
  }
}

export default Draft;