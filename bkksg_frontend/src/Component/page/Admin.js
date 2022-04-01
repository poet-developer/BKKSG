import { Component } from 'react'
import axios from 'axios'
import Update from './Update'
import Create from './Create'
import Preview from './Preview'
import styled from 'styled-components'
import Pagination from '../UI/Pagination'

class Admin extends Component{
     constructor(props){
          super(props);
          this.state = {
               mode : 'admin',
               posts : [],
               limit : 10,
               page : 1,
               offset: 1,
               formData : '',
               config : ''
          }
          this.readPreviewProcess = this.readPreviewProcess.bind(this);
          this.createProcess = this.createProcess.bind(this);
          this.deleteProcess =  this.deleteProcess.bind(this);
          this.btnHandler =  this.btnHandler.bind(this);
          this.setPage = this.setPage.bind(this);
     }

     // componentDidMount(){
     //      this.props.pagination(this.state.page);
     // }

     setPage(page) {
          this.setState({page : page})
     }

     // read
     readPreviewProcess(id, mode){
          if(id){
               axios.get('/admin/read', {
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
          let offset = (this.state.page - 1)*this.state.limit;
          let contentList;
          let _cover_src;
          const Content = styled.div`
          {
               border : 1px solid black;
          }`;
          // props로 데이터 받아옴
          if(this.props.content){
               const content = this.props.content;
               if(this.state.page){
               contentList = content.slice(offset, offset + this.state.limit).map(list => {
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
               }
               // this.props.pagination((this.state.page - 1)*this.state.limit, (this.state.page - 1)*this.state.limit+this.state.limit);
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
               <Pagination
               total={this.state.posts.length}
               limit={this.state.limit}
               page={this.state.page}
               setPage={this.setPage}
               />
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
                      if(pre_data[1] === '3' || pre_data[1] === '4'){
                         _cover_src = pre_data[5]
                      }
                      if(pre_data[1] === '1' || pre_data[1] === '2'){
                         _cover_src = pre_data[4]
                      }
                      console.log('크리', formData);
                    this.setState({
                    mode : 'preview',
                    pre_data : {
                         author : pre_data[0],
                         type: pre_data[1], 
                         title: pre_data[2], 
                         desc: pre_data[3],
                         cover_src : _cover_src
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