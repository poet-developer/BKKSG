import { Component } from 'react'
import axios from 'axios'
import Preview from './Preview'
import Update from './Update'
import Create from './Create'
import Project from './Project'

class Admin extends Component{
     constructor(props){
          super(props);
          this.state = {
               mode : 'admin',
          }
          this.readPreviewProcess = this.readPreviewProcess.bind(this);
          this.createProcess = this.createProcess.bind(this);
          this.deleteProcess =  this.deleteProcess.bind(this);
     }
     // read
     readPreviewProcess(id, mode){
          if(id){
               axios.get('/admin/read',{
                    params : {id}
               })
               .then(res => {
                    this.setState({
                         mode : mode,
                         data :
                              {
                              id : id,
                              author : res.data.nickname,
                              type :  res.data.topic,
                              title : res.data.title,
                              desc : res.data.description,
                              project : res.data.project
                         }
                    })
               })
               .catch(console.log);
          } 
     }

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

     createProcess(data){
          console.log('승인');
          axios.post('/admin/create_process', data)
                     .then(                                               
                       this.setState({
                       mode : ''
                       })
                     )
                     .catch('업로드 실패')
                     .finally(
                       window.location.replace("/admin")
                     );
     }

     deleteProcess(id){
          console.log('삭제', id);
          axios.post('/admin/delete_process', {id})
          .then(window.location.replace("/admin"))
          .catch(console.log)
          .finally(
               window.location.replace("/admin")
             );
     }
     
     render(){
          let contentList;
          // props로 데이터 받아옴
          if(this.props.content){
               const content = this.props.content;
               contentList = content.map(list => {
                    return    <tbody key = {list.id-1}>
                              <tr>
                              <td> </td>
                              <td>{list.topic} </td>
                              <td>{list.nickname} </td>
                              <td><a onClick = {(e) => {
                                   e.preventDefault();
                                   this.readPreviewProcess(list.id, 'read')
                              }} href = '/'>{list.title}</a></td>
                              <td>{list.project} </td> 
                              </tr>
                              </tbody>
               })   
               }

          return(
               <div className="admin">
               <h2><a href='/admin'>ADMIN</a></h2>
               <table data-admin="contents">
               <thead>                                             
               <tr>
                    <th> / </th>
                    <th>type</th>
                    <th>author</th>
                    <th>title</th>
                    <th>project</th>
               </tr>
               </thead>
               {contentList}
               </table>
               <hr/>
               <Project data = {this.props.project}></Project>
               <br/>
               {/* 'create'모드 만드는 버튼 */}
               <button onClick = {function (e) {
                 e.preventDefault();
                 this.setState({
                   mode : 'create'
                 })
               }.bind(this)}>CONTENT</button>
               <hr/>
               {/* 모드 들어가기 */}
               {
                    this.state.mode === "create"
                    //Create Mode : Draft
               ? <Create profile = {this.props.profile} type = {this.props.type} project = {this.props.project} handleSubmit = {function(author, type, title, desc, project){
                    console.log(author, type, title, desc, project);
                    this.setState({
                    mode : 'preview',
                    pre_data : {
                    author, type, title, desc, project
                    }
                    })
               }.bind(this)}></Create>
               : ''
               }

               {this.state.mode === "preview" && this.state.pre_data //Preview Mode
               ? <div>
               <button onClick = {function(e){
                 e.preventDefault();
                 const _confrimed = window.confirm('업로드 할까요?');
                   if(_confrimed){
                     // 데이터 전송.
                     this.createProcess(this.state.pre_data);
                   }else{
                     console.log('거부');
                   }
               }.bind(this)}>데이터저장</button>
                    <Preview data = {this.state.pre_data} ></Preview>
             </div>
             : ''
               }

               { this.state.data && this.state.mode === 'read' //Read Mode
               ?<div>
                <button onClick = {function(){
                                   this.setState({
                                        mode : 'update'
                                   });
                              }.bind(this)}>update</button>
               <form onSubmit={function(e){
                    e.preventDefault();
                    const _confrimed = window.confirm('삭제 할까요?');
                     if(_confrimed){
                          this.deleteProcess(this.state.data.id)
                     }else{
                          console.log('거부');
                     }
               }.bind(this)}>
                    <input type="hidden" name="id" value= {this.state.id} />
                    <input type='submit' value='Delete'/>
               </form>
               <Preview data = {this.state.data} type = {this.props.type} profile = {this.props.profile} id={this.state.id}></Preview>
               </div>
               : ''
               }

               { this.state.data && this.state.mode === 'update' //Read Mode
               ? <Update data = {this.state.data} type = {this.props.type} profile = {this.props.profile} project = {this.props.project}></Update>
               : ''
               }
          </div>
          )
     }
}

export default Admin