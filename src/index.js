import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import {BrowserRouter, Route, Routes} from "react-router-dom";

import Header from "./common/Header"
import HomePage from "./homepage/HomePage"
import TakeQuizzesPage from "./TakeQuizzesPage/TakeQuizzesPage"

ReactDOM.render(

  <BrowserRouter>

    <Header/>
    <Routes>

      <Route path="/" element={<HomePage/>} />
      <Route path="/TakeQuizzesPage" element={<TakeQuizzesPage/>} />

    </Routes>

  </BrowserRouter>,
  document.getElementById('root')
);

