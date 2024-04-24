import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import SignIn from './components/signIn';
import SignUp from './components/signUp';
import MainPage from './components/MainPage';



function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/signin' element={<SignIn />} />
          <Route path='/mainPage' element={<MainPage />} />
    
        </Routes>
      </div>
    </Router>
  );
}

export default App;
