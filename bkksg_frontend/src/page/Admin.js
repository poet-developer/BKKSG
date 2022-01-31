import { Component } from 'react';
import { Create } from '../Component/crud/Create'

class Admin extends Component{
     constructor(props){
          super(props);
          this.state = {
               mode : 'admin',
          }
     }
     render(){
          let lists;
          if(this.props.contentData){
               const content = this.props.contentData;
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
               {/* CREATE 모드 들어가기 */}
               <Create mode = {this.state.mode} chaingingMode = {function(){
                    this.setState({
                         mode : 'create'
                    })
               }.bind(this)}></Create>
          </div>
          )
     }
}

export default Admin