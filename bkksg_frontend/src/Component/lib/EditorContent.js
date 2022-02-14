import {Component} from "react";
import styled from 'styled-components';
import draftToHtml from 'draftjs-to-html';

const StyledTextarea = styled.textarea `
  display: none;
`
// 전송하는 에디터의 내용을 전송하는 부분
class EditorContent extends Component{
     constructor(props){
          super(props);
          this.state = {
               key : this.props.key
          }
     }
     render(){
          let content = draftToHtml(this.props.content);
          console.log(content);

          return(
               <StyledTextarea
               className = 'editorContent'
               value={content}
               name = 'desc'
               readOnly
               checkingTag = {function(){
               console.log('chekingTag :');
               }}
          />
          )
     }
}

export default EditorContent