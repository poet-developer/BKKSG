import { Component } from 'react'
import { CalledForm } from '../Component/crud/CalledForm'

class Admin extends Component{
     constructor(props){
          super(props);
          this.state = {
               mode : 'admin',
          }
     }
     
     render(){
          let lists;
          // props로 데이터 받아옴
          if(this.props.content){
               const content = this.props.content;
               lists = content.map(list => {
                    return    <tbody key = {list.id}>
                              <tr>
                              <td>{list.id} </td>
                              <td>{list.topic} </td>
                              <td>{list.nickname} </td>
                              <td>{list.title} </td>
                              <td>{list.description} </td>
                              <td><a href={"/admin/update?id="+list.id}><button>update</button></a></td>
                              <td><form action="/admin" method="POST">
                                   <input type="hidden" name="id" value= {list.id} />
                                   <input type="submit" value="delete"/>
                                   </form>
                              </td>
                              </tr>
                              </tbody>
               })   
               }
          
          return(
               <div className="admin">
               <h2>ADMIN</h2>
               <table data-admin="contents">
               <thead>
               <tr>
                    <th>id</th>
                    <th>type</th>
                    <th>author</th>
                    <th>title</th>
                    <th>desc</th>
                    <th>update</th>
                    <th>delete</th>
               </tr>
               </thead>
               {lists}
               </table><br/>
               <hr/>
               {/* 모드 들어가기 */}
               <CalledForm type = {this.props.type} profile = {this.props.profile}></CalledForm>
          </div>
          )
     }
}

export default Admin