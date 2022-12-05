import React, {useState} from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Header from "./common/Header"
import HomePage from "./homepage/HomePage"
import TakeQuizzesPage from "./TakeQuizzesPage/TakeQuizzesPage"
import MakeQuiz from "./makeQuiz/makeQuiz"
import User from "./User/User"
import Login from "./Login/Login"
import SearchBar from "./QuizSearchPage/QuizSearchPage.jsx"
import useToken from './useToken';

export default function App(){
    const { token, setToken } = useToken();

    if(!token) {
        return (
            <BrowserRouter>
            <Header/>
            <Routes>
                <Route path="/" element={<HomePage/>} />
                <Route path="/TakeQuizzesPage" element={<TakeQuizzesPage/>} />
                <Route path="/makeQuiz" element={<Login setToken={setToken}/>} />
                <Route path="/User" element={<Login setToken={setToken}/>} />
                <Route path="/SearchQuizzes" element={<SearchBar/>} />
            </Routes>
            </BrowserRouter>
        )
    }

    return (
        <BrowserRouter>
        <Header/>
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/TakeQuizzesPage" element={<TakeQuizzesPage/>} />
          <Route path="/makeQuiz" element={<MakeQuiz/>} />
          <Route path="/User" element={<User/>} />
          <Route path="/SearchQuizzes" element={<SearchBar/>} />
        </Routes>
      </BrowserRouter>
    );
}


