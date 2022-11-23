import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import {BrowserRouter, Route, Routes} from "react-router-dom";

import Header from "./common/Header"
import HomePage from "./homepage/HomePage"
import TakeQuizzesPage from "./TakeQuizzesPage/TakeQuizzesPage"
import User from "./User/User"
import Login from "./Login/Login"
import makeQuiz from "./makeQuiz/makeQuiz"

ReactDOM.render(

  <BrowserRouter>
    <Header/>
    <Routes>
      <Route path="/" element={<HomePage/>} />
      <Route path="/TakeQuizzesPage" element={<TakeQuizzesPage/>} />
      <Route path="/makeQuiz" element={<makeQuiz/>} />
      <Route path="/Login" element={<Login/>} />
      <Route path="/User" element={<User/>} />

    </Routes>

  </BrowserRouter>,
  document.getElementById('root')
);

