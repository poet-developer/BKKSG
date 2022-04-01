import { Component } from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
// import {Subject, TOC, Content, Tail}  from './Component/Test';
import Home from '../src/Component/page/Home'
import Poem from './Component/Contents/Poem'
import Essay from './Component/Contents/Essay'
import Visual from './Component/Contents/Visual'
import Project from './Component/Contents/Project'
import Admin from '../src/Component/page/Admin'
import axios from 'axios'


class Bkksg extends Component {
     constructor(props) {
          super(props);
          this.state = {
          }
     }
     
     componentDidMount(){
          this.getAxiosforAdmin();    
     }

     getAxiosforAdmin(){
          axios.get('/admin') 
          .then(res => { this.setState({
               data :
                {
                 content :  res.data.contents,
                 type : res.data.types,
                 profile : res.data.profiles,
               }
          })
     })
          .catch(console.log);
          // admin contet list 불러옴.
     }

     render(){
          console.log(window.innerWidth);
     return(
          <Router>
               <Routes>
                    <Route path='' element = {<Home/>}/>
                    <Route path='poem' element = {<Poem/>}/>
                    <Route path='essay' element = {<Essay/>}/>
                    <Route path='visual' element = {<Visual/>}/>
                    <Route path='project' element = {<Project/>}/>
                    <Route path='admin' element = {this.state.data ? <Admin content = {this.state.data.content} type = {this.state.data.type} profile = {this.state.data.profile}/> : ''} />
               </Routes>
          </Router>
     )
     }
}

export default Bkksg
