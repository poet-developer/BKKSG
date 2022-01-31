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
          this.getAxios();
     }

     getAxios(){
          axios.get('/admin')
          .then(res => { this.setState({
               contentData : res.data
          })})
          .catch(console.log);
          // admin contet list 불러옴.
     }

     send = () =>{
          const data = "Hello, I'm from React."
          axios.post('/admi/create_react', {data})
          .then('Suceess')
          .catch(console.log);
     }

     render(){
          
     return(
          <Router>
               <Routes>
                    <Route path='' element = {<Home/>}/>
                    <Route path='admin' element = {this.state.contentData ? <Admin contentData = {this.state.contentData}/> : ''}/>
               </Routes>
          </Router>
     )
     }
}

export default Bkksg
