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
import SearchBar from "./QuizSearchPage/QuizSearchPage.jsx"


if(!true) {
  ReactDOM.render(
    <BrowserRouter>
      <Header/>
      <SearchBar/>
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
      <SearchBar/>
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