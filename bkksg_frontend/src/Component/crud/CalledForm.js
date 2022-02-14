import { Component } from "react";
import Preview from "../../page/Preview";
import Draft from '../lib/draft'
import axios from 'axios'


class CalledForm extends Component {
     constructor(props) {
          super(props);
          this.state = {
            mode : '',
            //preview 관련데이터가 올것.
          }
     }
  
  // create 버튼 글씨 바꾸기
  createBtn(_text){
    if(!_text){
      _text = 'CREATE';
    }else{
      _text = '다시 만들기'
    }

    return (
    <button onClick = {function (e) {
      e.preventDefault();
      this.setState({
        mode : 'create'
      })
    }.bind(this)}>{_text}</button>
    )
  }   

  render() {
    let _calledForm;
    let _previewBtn;

    if(this.state.mode === 'preview'){
      _previewBtn = 
      <button onClick = {function(e){
        e.preventDefault();
        const _confrimed = window.confirm('업로드 할까요?');
          if(_confrimed){
            console.log('승인');
            //admin으로 redirect. 
            // 데이터 전송.
            axios.post('/admin/create_process', this.state.pre_data)
            .then(
              this.setState({
              mode : ''
              })
            )
            .catch('업로드 실패')
            .finally(
              window.location.replace("/admin")
            );
          }else{
            console.log('거부');
          }
      }.bind(this)}>데이터저장</button>;
    }
    
    if (this.state.mode === "create") {
      _calledForm =
           <Draft profile = {this.props.profile} type = {this.props.type} onSubmit = {function(author, type, title, desc){
             console.log(author, type, title, desc);
             this.setState({
               mode : 'preview',
               pre_data : {
                 author, type, title, desc
               }
             })
           }.bind(this)}></Draft>
    }else if(this.state.mode === 'preview' && this.state.pre_data){
      _calledForm = 
      //나즁애 마리보기 디자인
          <Preview data = {this.state.pre_data} ></Preview>;
    }
  
    return (
      <div className="_calledForm"> 
        {/* 'create'모드 만드는 버튼 */}
        {this.createBtn(this.state.pre_data)}
        {_previewBtn}
        {_calledForm}
          </div>
    );
  }
}

export { CalledForm };
