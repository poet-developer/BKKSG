import React, { useState } from "react";
import { Link, Navigate } from 'react-router-dom';
import Admin from './Admin'

const LoginForm = ({ login, authenticated }) => {
const [id, setId] = useState("");
const [password, setPassword] = useState("");
const [admit,setAdmit] = useState(false);
let from

const handleSubmit = (e) => {
  e.preventDefault();
  try {
    from = login({ id, password });
  } catch (e) {
    alert("Failed to login");
    setId("");
    setPassword("");
  }
  if(from){
    alert("Success to login");
    authenticated(from);
  } 
};

// const { from } = location.state || { from: { pathname: "/" } };
// if (authenticated) return <Navigate to={from} />;

return (
  <>
    <h1>Login</h1>
    <form onSubmit = {handleSubmit}>
    <input
      value={id}
      onChange={({ target: { value } }) => setId(value)}
      type="text"
      placeholder="id"
    />
    <input
      value={password}
      onChange={({ target: { value } }) => setPassword(value)}
      type="password"
      placeholder="password"
    />
    <input type = 'submit' value ='Login'/>
    </form>
  </>
);  

}

export default LoginForm