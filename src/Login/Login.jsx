import React, {useState} from 'react';
import './Login.css';
import PropTypes from 'prop-types';
import {Link} from "react-router-dom"

import './Login.css';

async function loginUser(credentials) {
  return fetch('http://localhost:8080/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
 }
 function Login_box({setToken}){
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async e => {
    e.preventDefault();
    const token = await loginUser({
      username,
      password
    });
    console.log(JSON.stringify(token));
    if((JSON.stringify(token) == '{"user":"Invalid User"}')){
      localStorage.setItem('loginFailed','true')
    }
    setToken(token);
  }
  return (
    <div class='login-page'>
      <div class="container">
        <div className="login">
          <h1>Please Log In</h1>
          <form onSubmit={handleSubmit} method="post" action="">
            <label>
              <p>Username</p>
              <p><input type="text" name="login"  placeholder="Username or Email" onChange={e => setUserName(e.target.value)}/></p>
            </label>
            <label>
              <p>Password</p>
              <p><input type="password" name="password"placeholder="Password" onChange={e => setPassword(e.target.value)}/></p>
            </label>
            <div>
            <ul class="nav nav-tabs">
              <li class="nav-item">
                  <Link to="/CreateUser" class="nav-link">Create New Account</Link>
              </li>
            </ul>
            <p class="submit"><button type="submit" name="commit" value="Login" >Submit</button></p>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
 }

export default function Login({ setToken }) {
  console.log(JSON.parse(localStorage.getItem('loginFailed')))
  if(JSON.parse(localStorage.getItem('loginFailed'))){
    const style = {
      margin: "auto",
      padding: "0% 5% 10% 5%",
      color: "Red",
      h1: {'text-align':'center'}
    }
    return (
      <div>
        <Login_box setToken={setToken}/>
        <div style = {style}><h1>Login failed, try again</h1></div>
      </div>
    )
  }
  return(
    <div><Login_box setToken={setToken}/></div>
  )
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired
}