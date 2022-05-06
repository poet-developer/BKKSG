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
      {logined ? (
        <>
          <button
            onClick={ e => {
              e.preventDefault()
              sessionStorage.setItem("Admin", false)
              window.location.replace("/centre/admin")
            }}
            style = {{margin: '1rem'}}
          >
            Logout
          </button>
          <Outlet />
        </>
      ) : (
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
