import React, {useState} from 'react';
//import './CreateUser.css';
import PropTypes from 'prop-types';

async function CreateUserUser(credentials) {
  return fetch('http://localhost:8080/CreateUser', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
 }

export default function CreateUser() {
  const [username, setUserName] = useState();
  const [password1, setPassword1] = useState();
  const [password2, setPassword2] = useState();

  const handleSubmit = async e => {
    e.preventDefault();
    const token = await CreateUserUser({
      username,
      password
    });
    console.log(token)
    setToken(token);
  }
  return(
    <div className="CreateUser-wrapper">
      <h1>Create User</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Username</p>
          <input type="text" onChange={e => setUserName(e.target.value)}/>
        </label>
        <label>
          <p>Password</p>
          <input type="password" onChange={e => setPassword1(e.target.value)}/>
        </label>
        <label>
          <p>Password</p>
          <input type="password" onChange={e => setPassword2(e.target.value)}/>
        </label>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  )
}