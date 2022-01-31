import { Component } from 'react';


class Create extends Component{
     render(){
          let createForm;
          if(this.props.mode === 'create'){
               createForm = 
               <form action = '/admin/create_process' method ='POST'>
                    <input type= 'text' name = 'title'/>
                    <input type= 'submit' value = '만들기'/>
               </form>
          }
          return(
               <div className = 'createForm'>
               <form action="/admin/create" method="GET" onClick = {function(e){
                    e.preventDefault();
                    this.props.chaingingMode();
               }.bind(this)}>
                    <input type="submit" value="CREATE"/>
               </form>
               <hr/>
               {createForm}
               </div>
          )
     }
}

export {Create}