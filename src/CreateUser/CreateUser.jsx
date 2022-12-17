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
 function Matching({booleanMatch}){
    const style = {
        margin: "auto",
        padding: "0% 5% 10% 5%",
        color: "Red",
        h1: {'text-align':'center'}
      }
      if(booleanMatch){
        return (
            <div>Those are some good passwords</div>
        )
      }else{
        return (
            <div>
            <div style = {style}><h1>Passwords don't match</h1></div>
            </div>
        )
      }
 }

export default function CreateUser({setToken}) {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const [password2, setPassword2] = useState();

  const handleSubmit = async e => {
    if(password == password2){
        e.preventDefault();
        const token = await CreateUserUser({
            username,
            password
        });
        setToken(token);
        this.context.router.history.push('');
    }
  }
  return(
    <div className="CreateUser-wrapper">
      <h1>Create User</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>username</p>
          <input type="text" onChange={e => setUserName(e.target.value)}/>
        </label>
        <label>
          <p>password</p>
          <input type="password" onChange={e => setPassword(e.target.value)}/>
        </label>
        <label>
          <p>retype Password</p>
          <input type="password" onChange={e => setPassword2(e.target.value)}/>
        </label>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
      <Matching booleanMatch={(password == password2)}/>
    </div>
  )
}
CreateUser.propTypes = {
    setToken: PropTypes.func.isRequired
  }