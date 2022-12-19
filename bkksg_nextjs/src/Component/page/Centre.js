import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Login from "../page/Login";
import Auth from "../lib/auth";

function Centre() {
  const [logined, setLogin] = useState(false)
  useEffect(()=> {
    if (sessionStorage.getItem("Admin") === "true") setLogin(true);
    else setLogin(false);
  }, [])
  
  return (
    <>
      {logined ? ( // 로그인이 되어있는지 확인
        <>
          <button
            onClick={ e => {
              e.preventDefault()
              sessionStorage.setItem("Admin", false)
              window.location.replace("/centre")
            }}
            style = {{margin: '1rem'}}
          >
            Logout
          </button>
          <Outlet />
        </>
      ) : ( // 로그인 안되어있으면 로그인 Comp를 보여줄 것.
        <>
          <Login 
            login={Auth}
            authenticated={data => {
              sessionStorage.setItem("Admin", true)
              window.location.replace("/centre/admin")
            }}
          ></Login>
        </>
      )}
    </>
  );
}

export default Centre
