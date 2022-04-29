import { Component } from 'react'
import axios from 'axios'
import Update from './Update'
import Create from './Create'
import Preview from './Preview'
import styled from 'styled-components'
import Pagination from '../lib/Pagination'

class Admin extends Component{
     constructor(props){
          super(props);
          this.state = {
               mode : 'admin',
               user: null,
               posts : [],
               limit : 15,
               page : 1,
               offset: 1,
               formData : '',
               config : '',
               imageURL : ''
          }
          this.readPreviewProcess = this.readPreviewProcess.bind(this);
          this.createProcess = this.createProcess.bind(this);
          this.deleteProcess =  this.deleteProcess.bind(this);
          this.btnHandler =  this.btnHandler.bind(this);
          this.setPage = this.setPage.bind(this);
     }

     setPage(page) {
          this.setState({page : page})
     }

     async readPreviewProcess(id, mode){
          try{
          if(id){
               await axios.get('/admin/read', {
                    params : {id}
               })
               .then(res => {
                    let _data = res.data;
                    this.setState({
                         mode : mode,
                         data :
                              {
                              id : id,
                              public : _data.public,
                              type :  _data.type_id,
                              title : _data.title,
                              desc : _data.description,
                              cover_src : _data.cover_src,
                         }
                    })
               })
               .catch(console.log);
          }
     }catch(err){
          throw new Error(err);
     } 
     }

     async createProcess(){
          try{
          await axios.post('/admin/create_process', this.state.formData, this.state.config)
                     .then(                        
                       this.setState({
                       mode : ''
                       })
                       //Float a popup
                     )
                     alert('Uploaded!');
                     window.location.replace("/centre/admin");
          }catch(err){
               console.log(err);
               throw new Error(err);
          }
     }

     async deleteProcess(id,type,cover_src){
     try{
          await axios.post('/admin/delete_process', {id,type,cover_src})
          .then(alert('deleted.'))
          .catch(console.log)
          window.location.replace("/centre/admin");
     }catch(err){
          console.log(err);
          throw new Error(err);
     }
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
                              <td><a onClick = {(e) => {
                                   e.preventDefault();
                                   this.readPreviewProcess(list.id, 'read')
                              }} href = '/'>{list.title}</a></td>
                              <td>{list.public === 1
                              ? 'O'
                              : 'X'}</td>
                              </tr>
                              </tbody>
                    })   
                   }
               }
          return(

               <div className="admin">
               <h2><a href='/centre/admin'>ADMIN</a></h2>
                    <Content>
               <h4>** Contents</h4>
               <table data-admin="contents">
               <thead>                                             
               <tr>
                    <th> / </th>
                    <th>type</th>
                    <th>title</th>
                    <th>public</th>
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
               ? <Create type = {this.props.type} submitHandler = {function(formData, config){
                    let pre_data = []
                    for (var value of formData.values()) {
                         pre_data.push(value);
                      }
                      if(pre_data[1] === '3' || pre_data[1] === '4'){
                           _cover_src = pre_data[5]
                           let _fileReader = new FileReader();
                           _fileReader.readAsDataURL(_cover_src);
                           _fileReader.onload = e => this.setState({imageURL : e.target.result});
                         //   debugger;
                      }
                      if(pre_data[1] === '1' || pre_data[1] === '2') _cover_src = pre_data[4]
                    this.setState({
                    mode : 'preview',
                    pre_data : {
                         public : pre_data[0],
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
                   if(_confrimed)this.createProcess()
                   else console.log('거부')
               }.bind(this)}>데이터저장</button>
                    <Preview data = {this.state.pre_data} imgSrc = {this.state.imageURL}></Preview>
             </div>
             : ''
               }

               { this.state.data && this.state.mode === 'read' //Read Mode
               ?<div>
                <button data-mode = 'update' onClick = {this.btnHandler}>update</button>
               <form onSubmit={function(e){
                    e.preventDefault();
                    const _confrimed = window.confirm('삭제 할까요?');
                     if(_confrimed)this.deleteProcess(this.state.data.id, this.state.data.type, this.state.data.cover_src)
                     else console.log('거부')
               }.bind(this)}>
                    <input type="hidden" name="id" value= {this.state.id} />
                    <input type='submit' value='Delete'/>
               </form>
               <Preview data = {this.state.data}></Preview>
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