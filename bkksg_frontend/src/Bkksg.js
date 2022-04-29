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
     const [themeMode, setThemeMode] = useState(getTheme); //Day;
     const [checkIe, detectBrowser] = useState(false);

     useEffect(() => {
          getAxiosforAdmin();
          if(localStorage.getItem('Theme') === null)localStorage.setItem("Theme",getHour());
          detectBrowser(detectIE);
          
     },[]);

     const getAxiosforAdmin = async() =>{
          await axios.get('/admin') 
          .then(res => {
                 getContent(res.data.contents);
                 getType(res.data.types);
          })
          .catch(console.log);
          // admin contet list 불러옴.
     }
     
     const themeHandler = () =>{
          setThemeMode(!themeMode);
     }
     const detectIE = () => {
          // Internet Explorer 6-11
          const isIE = /*@cc_on!@*/false || !!document.documentMode;

          // Edge 20+
          const isEdge = !isIE && !!window.StyleMedia;
          if(isIE || isEdge) return true
     }

     const getHour = () => {
          const now = new Date();
          // console.log(now.getHours());
               if(now.getHours() > 18) {return "night"}
               else return "day"
     }

     return(
          
          <Router>
               {!checkIe
               ?
               <Routes>
                    <Route path='' element = {<Home themeMode = {themeMode} themeHandler = {themeHandler}/>}/>
                    <Route path='poem' element = {<Poem themeMode = {themeMode} themeHandler = {themeHandler}/>}/>
                    <Route path='essay' element = {<Essay themeMode = {themeMode} themeHandler = {themeHandler} />}/>
                    <Route path='visual' element = {<Visual themeMode = {themeMode} themeHandler = {themeHandler} />}/>
                    <Route path='project' element = {<Project themeMode = {themeMode} themeHandler = {themeHandler} />}/>
                    <Route path='centre' element = {<Centre/>}>
                         <Route path='admin' element = {content && type ? <Admin content = {content} type = {type}/> : ''} />
                    </Route>
               </Routes>
          : `해당 브라우저를 지원하지 않습니다. | This Browser Is Denied to Access This App.`}
          </Router>
     )
}

export default Bkksg
