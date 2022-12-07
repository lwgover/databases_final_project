import React, {useState} from 'react';
import './Login.css';
import PropTypes from 'prop-types';

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

export default function Login({ setToken }) {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async e => {
    e.preventDefault();
    const token = await loginUser({
      username,
      password
    });
    console.log(token)
    setToken(token);
  }
  return(
    <div class="container">
      <div className="login">
        <h1>Please Log In</h1>
        <form onSubmit={handleSubmit} method="post" action="">
          <label>
            <p>Username</p>
            <p><input type="text" name="login" value="" placeholder="Username or Email" onChange={e => setUserName(e.target.value)}/></p>
          </label>
          <label>
            <p>Password</p>
            <p><input type="password" name="password" value="" placeholder="Password" onChange={e => setPassword(e.target.value)}/></p>
          </label>
          <div>
          <p class="submit"><button type="submit" name="commit" value="Login" >Submit</button></p>
          </div>
        </form>
      </div>
    </div>
  )
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired
}