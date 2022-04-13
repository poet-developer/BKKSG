import React, { useState, useEffect } from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import Home from '../src/Component/page/Home'
import Poem from './Component/Contents/Poem'
import Essay from './Component/Contents/Essay'
import Visual from './Component/Contents/Visual'
import Project from './Component/Contents/Project'
import Admin from '../src/Component/page/Admin'
import Centre from '../src/Component/page/Centre'
import axios from 'axios'
import getTheme from '../src/Component/lib/getTheme'




function Bkksg() {
     const [content, getContent] = useState('');
     const [type, getType] = useState('');
     const [profile, getProfile] = useState('');
     const [themeMode, setThemeMode] = useState(getTheme); //Day;

     useEffect(() => {
          getAxiosforAdmin();
          if(localStorage.getItem('Theme') === null){
               localStorage.setItem("Theme","day");
          }
     },[]);

     const getAxiosforAdmin = () =>{
          axios.get('/admin') 
          .then(res => {
                 getContent(res.data.contents);
                 getType(res.data.types);
                 getProfile(res.data.profiles);
          })
          .catch(console.log);
          // admin contet list 불러옴.
     }
     
     const themeHandler = () =>{
          setThemeMode(!themeMode);
     }
     return(
          <Router>
               <Routes>
                    <Route path='' element = {<Home themeMode = {themeMode} themeHandler = {themeHandler}/>}/>
                    <Route path='poem' element = {<Poem themeMode = {themeMode} themeHandler = {themeHandler}/>}/>
                    <Route path='essay' element = {<Essay themeMode = {themeMode} themeHandler = {themeHandler} />}/>
                    <Route path='visual' element = {<Visual themeMode = {themeMode} themeHandler = {themeHandler} />}/>
                    <Route path='project' element = {<Project themeMode = {themeMode} themeHandler = {themeHandler} />}/>
                    <Route path='centre' element = {<Centre/>}>
                         <Route path='admin' element = {content && type && profile ? <Admin content = {content} type = {type} profile = {profile}/> : ''} />
                    </Route>
               </Routes>
          </Router>
     )
}

export default Bkksg
