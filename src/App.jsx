import React, {useState} from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Header from "./common/Header"
import HomePage from "./homepage/HomePage"
import TakeQuizzesPage from "./TakeQuizzesPage/TakeQuizzesPage"
import MakeQuiz from "./makeQuiz/makeQuiz"
import User from "./User/User"
import Login from "./Login/Login"
import SearchBar from "./QuizSearchPage/QuizSearchPage.jsx"
import CreateUser from "./CreateUser/CreateUser.jsx"
import Footer from "./common/Footer.jsx"
import useToken from './useToken';

export default function App(){
    const { user, setToken } = useToken();
    console.log('app user: ' + user);
    if(!user || user == 'Invalid User') {
        return (
            <BrowserRouter>
            <Header/>
            <Routes>
                <Route path="/" element={<HomePage/>} />
                <Route path="/TakeQuizzesPage" element={<TakeQuizzesPage/>} />
                <Route path="/makeQuiz" element={<Login setToken={setToken}/>} />
                <Route path="/User" element={<Login setToken={setToken}/>} />
                <Route path="/SearchQuizzes" element={<SearchBar/>} />
                <Route path="/CreateUser" element={<CreateUser/>} />
            </Routes>
            <Footer/>
            </BrowserRouter>
        )
    }

    return (
        <BrowserRouter>
        <Header/>
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/TakeQuizzesPage" element={<TakeQuizzesPage/>} />
          <Route path="/makeQuiz" element={<MakeQuiz user={user}/>} />
          <Route path="/User" element={<User username={user}/>} />
          <Route path="/SearchQuizzes" element={<SearchBar/>} />
        </Routes>
        <Footer/>
      </BrowserRouter>
    );
}


