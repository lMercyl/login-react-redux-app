import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Contacts from './pages/Сontacts';

const App = () => {
  return (
    <Routes>
      <Route path="/login-react-redux-app" element={<Login />} />
      <Route path="/login-react-redux-app/contacts" element={<Contacts />} />
    </Routes>
  );
};

export default App;
