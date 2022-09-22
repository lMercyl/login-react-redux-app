import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Contacts from './pages/Сontacts';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/contacts" element={<Contacts />} />
    </Routes>
  );
};

export default App;
