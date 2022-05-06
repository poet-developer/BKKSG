import React, { useState } from "react";

const LoginForm = ({ login, authenticated }) => {
  const [id, setId] = useState("")
  const [password, setPassword] = useState("")
  let from

  const handleSubmit = e => {
    e.preventDefault()
    try {
      from = login({ id, password })
    } catch (e) {
      alert("Failed to login")
      setId("")
      setPassword("")
    }
    if (from) {
      alert("Success to login")
      authenticated(from)
    }
  }

  return (
    <div style = {{margin: '1rem'}}>
      <h1 style = {{margin: '1rem 0', fontSize : "2rem"}} >Login</h1>
      <form onSubmit={handleSubmit}>
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
        <input type="submit" value="Login" />
      </form>
    </div>
  );
};

export default LoginForm
