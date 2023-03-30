import './App.css';
import React, { createContext, useReducer } from "react";
import Header from './layout/Header';
import Home from './components/Home';
import Post from './components/newsdetail';
import AddNews from './components/addnews';
import Lecturer from './components/lecturer';
import Classs from './components/classs';
import Student from './components/studentdetail';
import StudentScoreForm from './components/addscores'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Footer from './layout/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import Login from './components/login';
import Register from './components/register';
import myReducer from './reducers/myReducer';
import cookies from 'react-cookies'


export const UserContext =createContext()

function App() {
  const [user, dispatch] = useReducer(myReducer, cookies.load('current-user'))

  return (
    <BrowserRouter>
      <UserContext.Provider value = {[user, dispatch]}>
        <Container>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/news/:newsId" element={<Post />} />
            <Route path="/news/add-news" element={<AddNews />} />
            <Route path="/lecturer" element={<Lecturer />} />
            <Route path="/classs/:classsId/student" element={<Classs />} />
            <Route path="/student/:studentId" element={<Student />} />
            <Route path="student/:studentId/add-scores" element={<StudentScoreForm />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
          <Footer />
        </Container>
        </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;