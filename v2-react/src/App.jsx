import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
// Import global styles if not imported in main.jsx (Vite defaults to main.jsx)
// But I moved style.css to src/index.css which main.jsx imports by default.

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/minimalist" element={<div style={{paddingTop: '100px'}}>Minimalist Page (Coming Soon)</div>} />
          <Route path="/inspirate" element={<div style={{paddingTop: '100px'}}>Inspirate Page (Coming Soon)</div>} />
          {/* Add more routes as we migrate */}
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
