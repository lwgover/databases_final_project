import React, {useState} from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Header from "./common/Header"
import HomePage from "./homepage/HomePage"
import TakeQuizzesPage from "./TakeQuizzesPage/TakeQuizzesPage"
import MakeQuiz from "./makeQuiz/makeQuiz"
import User from "./User/User"
import Login from "./Login/Login"
import SearchBar from "./QuizSearchPage/QuizSearchPage.jsx"

export default function App(){
    const [token, setToken] = useState();

    if(!token) {
        return <Login setToken={setToken} />
    }

    return (
        <BrowserRouter>
        <Header/>
        <SearchBar/>
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/TakeQuizzesPage" element={<TakeQuizzesPage/>} />
          <Route path="/makeQuiz" element={<MakeQuiz/>} />
          <Route path="/User" element={<User/>} />
        </Routes>
      </BrowserRouter>
    );
}


