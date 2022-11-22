import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import {BrowserRouter, Route, Routes} from "react-router-dom";

import Header from "./common/Header"
import HomePage from "./homepage/HomePage"
import TakeQuizzesPage from "./TakeQuizzesPage/TakeQuizzesPage"
import User from "./User/User"
import loginPage from "./login/login"

ReactDOM.render(

  <BrowserRouter>

    <Header/>
    <Routes>
      <Route path="/" element={<HomePage/>} />
      <Route path="/TakeQuizzesPage" element={<TakeQuizzesPage/>} />
      <Route path="/User" element={<User/>} />
      <Route path="/login" element={<loginPage/>} />

    </Routes>

  </BrowserRouter>,
  document.getElementById('root')
);

