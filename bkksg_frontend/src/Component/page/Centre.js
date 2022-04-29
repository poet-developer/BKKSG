import React, {useState} from "react";
import { Outlet, Navigate } from "react-router-dom";
import Login from '../page/Login'
import Auth from '../lib/auth'

function Centre(props) {
     // const [auth,setAuth] = useState(null);
     // console.log(auth);
     let logined;
     if(sessionStorage.getItem("Admin") === 'true'){
          logined = true;
     }else{
          logined = false;
     }
  return (
    <>
     {logined
     ?<>
     <button onClick={function(e){
          e.preventDefault();
          sessionStorage.setItem("Admin", false );
          window.location.replace("/centre/admin")
     }}>Logout</button>
     <Outlet/>
     </>
     :<>
     <Login login = {Auth} authenticated={function(data){
          sessionStorage.setItem("Admin", true );
          window.location.replace("/centre/admin")
     }}></Login>
     </>
     }    
    </>
  );
}

export default Centre;