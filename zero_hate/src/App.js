import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/login';
import Signup from './components/signup';
import Aim from './components/aim';
import Help from './components/help';
import Home from './components/home';
import Analysis from './components/analysis';
import Results from './components/results'; 
import Contact from './components/contact'; 
import Goals from './components/goals'; 
import NoSignUp from './components/nosignup';
import { auth } from './firebase/firebase'; // Assuming you have Firebase authentication set up

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setUser(user);
    });

    return unsubscribe;
  }, []);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={user ? <Navigate to="/analysis" /> : <Home />} />
          <Route path="/login" element={!user ? <Login /> : <Navigate to="/analysis" />} />
          <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/analysis" />} />
          <Route path="/aim" element={<Aim />} />
          <Route path="/help" element={<Help />} />
          <Route path="/analysis" element={user ? <Analysis /> : <Navigate to="/login" />} />
          <Route path="/results" element={<Results />} />
          <Route path="/contact" element={<Contact />} /> 
          <Route path="/goals" element={<Goals />} />
          <Route path="/nosignup" element={<NoSignUp />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
