import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import { Login, Register, Home, SplitCreator, WorkoutCreator, ViewWorkout, DoWorkout, ViewHistory } from './pages';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { logout } from './apiCalls';

function App() {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('token') !== null) {
      setIsAuth(true);
    }
  }, []);
  return (
    <div className="App">
      {!isAuth ? (
        <>
          <Router>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </Router>
        </>
      ) : (
        <>
          <Button onClick={logout} variant="primary" className="login-info">Log Out</Button>
          <Button href="/" variant="primary" className="home-button">Home</Button>
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/create-split" element={<SplitCreator />} />
              <Route path="/create-workout" element={<WorkoutCreator />} />
              <Route path="/view-workout/:id" element={<ViewWorkout />} />
              <Route path="/do-workout/:id" element={<DoWorkout />} />
              <Route path="/workout-history/" element={<ViewHistory />} />
            </Routes>
          </Router>
        </>
      )}
    </div>
  );
}

export default App;
