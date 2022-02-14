import { Component } from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
// import {Subject, TOC, Content, Tail}  from './Component/Test';
import Home from './page/Home'
import Admin from './page/Admin'
import axios from 'axios'


class Bkksg extends Component {
     constructor(props) {
          super(props);
          this.state = {
          }
     }
     
     componentDidMount(){
          console.log('didMount');
          this.getAxiosforAdmin();
     }

     getAxiosforAdmin(){
          axios.get('/admin')
          .then(res => { this.setState({
               data :
                {
                 content :  res.data.contents,
                 type : res.data.types,
                 profile : res.data.profiles
               }
          })
     })
          .catch(console.log);
          // admin contet list 불러옴.
     }

     render(){
          // this.send();
     return(
          <Router>
               <Routes>
                    <Route path='' element = {<Home/>}/>
                    <Route path='admin' element = {this.state.data ? <Admin content = {this.state.data.content} type = {this.state.data.type} profile = {this.state.data.profile}/> : ''}/>
               </Routes>
          </Router>
     )
     }
}

export default Bkksg
