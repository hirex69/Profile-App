import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import AdminDashboard from './components/Admindashboard';


const App = () => {
  return (
    <Router>
      <div className="app">
        <h1>Profile App</h1>
        <nav>
          <Link to="/login">Login</Link> | <Link to="/register">Register</Link> |  <Link to="/admindashboard">Dashboard</Link> 
        </nav>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/admindashboard" element={<AdminDashboard />} />


        </Routes>
      </div>
    </Router>
  );
};

export default App;
