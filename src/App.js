import React from 'react';
import './App.css';
import Header from './components/layouts/Header';
import Adoft from './components/Adoft';
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
  return (
    <Router>
    <div className="App">
      <Header />
      <Adoft />
    </div>
    </Router>
  );
}

export default App;
