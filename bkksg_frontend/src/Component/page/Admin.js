import { Component } from 'react'
import axios from 'axios'
import Update from './Update'
import Create from './Create'
import Preview from './Preview'
import styled from 'styled-components'

class Admin extends Component{
     constructor(props){
          super(props);
          this.state = {
               mode : 'admin',
          }
          this.readPreviewProcess = this.readPreviewProcess.bind(this);
          this.createProcess = this.createProcess.bind(this);
          this.deleteProcess =  this.deleteProcess.bind(this);
          this.btnHandler =  this.btnHandler.bind(this);
     
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
                              author : res.data.profile_id,
                              type :  res.data.type_id,
                              title : res.data.title,
                              desc : res.data.description,
                              cover_src : res.data.cover_src,
                         }
                    })
               })
               .catch(console.log);
          } 
     }


     createProcess(){
          console.log('승인');
          axios.post('/admin/create_process', this.state.formData, this.state.config)
                     .then(                                
                       this.setState({
                       mode : ''
                       })
                       //Float a popup
                     )
                     .catch(console.log('업로드 실패'))
                     .finally(
                       window.location.replace("/admin")
                     );
     }

     deleteProcess(id){
          console.log('삭제', id);
          axios.post('/admin/delete_process', {id})
          .then(window.location.replace("/admin"))
          .catch(console.log('삭제 실패'))
          .finally(
               window.location.replace("/admin")
             );
     }

     btnHandler(e){
          e.preventDefault();
          this.setState({
          mode : e.target.dataset.mode
          });
     }
     
     render(){
          let contentList;
          const Content = styled.div`
          {
               border : 1px solid black;
          }`;
          // props로 데이터 받아옴
          if(this.props.content){
               const content = this.props.content;
               contentList = content.map(list => {
                    return    <tbody key = {list.id}>
                              <tr>
                              <td> </td>
                              <td>{list.topic} </td>
                              <td>{list.nickname} </td>
                              <td><a onClick = {(e) => {
                                   e.preventDefault();
                                   this.readPreviewProcess(list.id, 'read')
                              }} href = '/'>{list.title}</a></td>
                              </tr>
                              </tbody>
               })   
               }

          return(
               <div className="admin">
                    <Content>
               <h2><a href='/admin'>ADMIN</a></h2>
               <h4>** Contents</h4>
               <table data-admin="contents">
               <thead>                                             
               <tr>
                    <th> / </th>
                    <th>type</th>
                    <th>author</th>
                    <th>title</th>
               </tr>
               </thead>
               {contentList}
               </table>
               </Content>
               <hr/>
               
               <br/>
               {/* 'create'모드 만드는 버튼 */}
               <button data-mode = 'create' onClick = {this.btnHandler}>CONTENT</button>
               <hr/>
               {/* 모드 들어가기 */}
               {
                    this.state.mode === "create"
                    //Create Mode : Draft
               ? <Create profile = {this.props.profile} type = {this.props.type} submitHandler = {function(formData, config){
                    let pre_data = []
                    for (var value of formData.values()) {
                         pre_data.push(value);
                      }
                    this.setState({
                    mode : 'preview',
                    pre_data : {
                         author : pre_data[0],
                         type: pre_data[1], 
                         title: pre_data[2], 
                         desc: pre_data[3],
                         cover_src : pre_data[4]
                    },
                    formData,
                    config
                    })
               }.bind(this)}></Create>
               : ''
               }

               {this.state.mode === "preview" && this.state.formData //Preview Mode
               ? <div>
               
               <button onClick = {function(e){
                 e.preventDefault();
                 const _confrimed = window.confirm('업로드 할까요?');
                   if(_confrimed){
                     this.createProcess();
                   }else{
                     console.log('거부');
                   }
               }.bind(this)}>데이터저장</button>
                    <Preview data = {this.state.pre_data} profile = {this.props.profile}></Preview>
             </div>
             : ''
               }

               { this.state.data && this.state.mode === 'read' //Read Mode
               ?<div>
                <button data-mode = 'update' onClick = {this.btnHandler}>update</button>
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
               <Preview data = {this.state.data} profile = {this.props.profile}></Preview>
               </div>
               : ''
               }

               { this.state.data && this.state.mode === 'update' //Update Mode
               ? <Update data = {this.state.data} type = {this.props.type} profile = {this.props.profile}></Update>
               : ''
               }
          </div>
          )
     }
}

export default Admin