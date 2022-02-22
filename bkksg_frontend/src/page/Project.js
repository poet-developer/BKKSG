import {Component} from 'react'
import axios from 'axios'

// 프로젝트를 삭제시, 콘텐츠가 유실되어 안보이는 버그 발생.
class Project extends Component{
     constructor(props){
          super(props);
          this.state = {
               mode : ''
          }
          this.readProjectProcess = this.readProjectProcess.bind(this);
          this.buttonHandle = this.buttonHandle.bind(this);
          this.submitHandle = this.submitHandle.bind(this);
          this.deleteProcess = this.deleteProcess.bind(this);
     }

     submitHandle(e){
          e.preventDefault();
          if(this.state.mode === 'create'){
               const _confrimed = window.confirm('프로젝트를 만들까요?');
               if(_confrimed){
               console.log('승인');
               const data = {project : e.target.project.value,
                              project_desc : e.target.project_desc.value}
               axios.post('/admin/project/create_process', data)
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
          }else if(this.state.mode === 'update'){
               const _confrimed = window.confirm('프로젝트를 수정 할까요?');
               if(_confrimed){
               console.log('승인');
               const data = { id: this.state.data.id,
                              project : e.target.project.value,
                              project_desc : e.target.project_desc.value}
               axios.post('/admin/project/update_process', data)
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
          }
     }

     buttonHandle(e){
          this.setState({
               mode : e.target.dataset.mode
          })
     }

     deleteProcess(){
          const _confrimed = window.confirm('프로젝트를 수정 할까요?');
          if(_confrimed){
               console.log('삭제', this.state.data.id);
               axios.post('/admin/project/delete_process', {id : this.state.data.id})
               .then(window.location.replace("/admin"))
               .catch(console.log)
          }else{
               console.log('거부')
          }
     }

     readProjectProcess(id, mode){
          if(id){
               axios.get('/admin/read_project', {
                    params : {id}
               })
               .then(res => {
                    this.setState({
                         mode : mode,
                         data :
                              {
                              id : id,
                              project : res.data.project[0].project,
                              desc : res.data.project[0].project_desc,
                              contents : res.data.content
                         }
                    })
               })
               .catch(console.log);
          } 
     }

     //project 정보 리스트/
     render(){
          let projectList;
          let targetProjects;
          const project = this.props.data;
               projectList = project.map(list => {
                    return    <tbody key = {list.id-1}>
                              <tr>
                              <td> </td>
                              <td><li><a onClick = {(e) => {
                                   e.preventDefault();
                                   this.readProjectProcess(list.id, 'read')
                              }} href = '/'>{list.project}</a></li></td>
                              </tr>
                              </tbody>
               })   
          if(this.state.mode === 'read'){
          const content = this.state.data.contents
               targetProjects = content.map(list => {
                    return    <tbody key = {list.id-1}>
                              <tr>
                              <td> </td>
                              <td>
                                   {/* <a onClick = {(e) => {
                                   e.preventDefault();
                                   this.readProjectProcess(list.id, 'read')
                              }} href = '/'> */}
                                   <li>{list.title}</li>
                                   {/* </a> */}
                                   </td>
                              </tr>
                              </tbody>
              })
          }

          return(
               <div className='project'>
                     <button data-mode = 'create' onClick={this.buttonHandle}>PROJECT</button>
                    <table data-admin="project">
                    <thead>                
                    <tr>
                         <th>project</th>
                    </tr>
                    </thead>
                    {projectList}
                    </table>
                    <div className = 'project_desc'>
                         {
                              this.state.mode === 'read'
                              ?<label><hr/>
                              <h4>Project Detail</h4>
                              <button data-mode = 'update' onClick={this.buttonHandle}>Update</button>
                              <form onSubmit={this.deleteProcess}>
                                   <input type ='submit' value='Delete'/>
                              </form>
                              <h5>{this.state.data.project}
                              <br/>| <em>{this.state.data.desc}</em>
                              </h5>
                              
                              <table data-admin="project">
                              <thead>   
                              <tr>
                              <th>content :</th>
                              </tr>
                              </thead>
                              {targetProjects}
                              </table>
                              </label>
                              : ''
                         }
                    </div>
                    
                    <hr/>
                    {this.state.mode && this.state.mode !== 'read'
                     ? <form onSubmit={this.submitHandle}>
                         <label><h4>{
                              this.state.mpde === 'update'
                              ? 'Project 수정'
                              : 'Project 만들기'
                              }</h4></label>
                         <label>이름 :
                         { this.state.mode === 'update'
                        ? <input type = 'text' name = 'project' defaultValue = {this.state.data.project}  required/>
                        : <input type = 'text' name = 'project' placeholder = '프로젝트 이름'  required/>
                         }
                         </label><br/>
                         {/* <label>표지 :
                         <input type = 'file' name = 'project_cover'/>
                         </label><br/> */}
                         <label>설명 : <br/>
                         { this.state.mode === 'update'
                         ?<textarea defaultValue ={this.state.data.desc} name ='project_desc'/>
                         :<textarea placeholder='300자 정도로 입력홰주세요.' name ='project_desc'/>
                         }
                         </label><br/>
                         <input type = 'submit' value = {
                              this.state.mode === 'update'
                              ?'프로젝트 수정'
                              :'프로젝트 생성'}/>
                    </form>
                    :''
                    }

               </div>
          )
     }

}

export default Project