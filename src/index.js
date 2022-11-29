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


function setToken(userToken) {
  sessionStorage.setItem('token', JSON.stringify(userToken));
}

function getToken() {
  const tokenString = sessionStorage.getItem('token');
  const userToken = JSON.parse(tokenString);
  return userToken?.token
}

const token = getToken();

if(token) { // make this !token
  console.log("hello");
  <Login setToken={setToken} />
}else{
  ReactDOM.render(
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/Login" element={<Login/>} />
        <Route path="/TakeQuizzesPage" element={<TakeQuizzesPage/>} />
        <Route path="/makeQuiz" element={<MakeQuiz/>} />
        <Route path="/User" element={<User/>} />
      </Routes>

    </BrowserRouter>,
    document.getElementById('root')
  );
}