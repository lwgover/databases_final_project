import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import {BrowserRouter, Route, Routes} from "react-router-dom";

import Header from "./common/Header"
import HomePage from "./homepage/HomePage"
import TakeQuizzesPage from "./TakeQuizzesPage/TakeQuizzesPage"
import MakeQuiz from "./makeQuiz/makeQuiz"
import User from "./User/User"
import Login from "./Login/Login"
import useToken from './useToken';

function getToken(){
  const tokenString = localStorage.getItem('token');
  const userToken = JSON.parse(tokenString);
  return userToken?.token;
}

const [token, setToken] = useState(getToken());

const saveToken = userToken => {
  localStorage.setItem('token', JSON.stringify(userToken));
  setToken(userToken.token);
};

//const { token, setToken } = useToken();

if(!token) { // make this !token
  ReactDOM.render(
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/TakeQuizzesPage" element={<TakeQuizzesPage/>} />
        <Route path="/makeQuiz" element={<Login setToken={setToken} />} />
        <Route path="/User" element={<Login setToken={setToken} />} />
      </Routes>

    </BrowserRouter>,
    document.getElementById('root')
  );
}else{
  ReactDOM.render(
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/TakeQuizzesPage" element={<TakeQuizzesPage/>} />
        <Route path="/makeQuiz" element={<MakeQuiz/>} />
        <Route path="/User" element={<User/>} />
      </Routes>
    </BrowserRouter>,
    document.getElementById('root')
  );
}