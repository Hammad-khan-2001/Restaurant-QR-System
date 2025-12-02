import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import ProtectRoutes from './components/ProtectRoutes';
import OpenRoutes from './components/OpenRoutes';
import Menu from './pages/Menu';
import Cart from './pages/Cart';
import Contact from './components/Contact'


const App = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            //required accessToken to get this page
            <OpenRoutes>
              <Home />
            </OpenRoutes>
          }
        />

        <Route
          path="/menu"
          element={
            <ProtectRoutes>
              <Menu />
            </ProtectRoutes>
          }
        />

        <Route
          path="/cart"
          element={
            <ProtectRoutes>
              <Cart />
            </ProtectRoutes>
          }
        />

        <Route
          path="/contact"
          element={
            <ProtectRoutes>
              <Contact />
            </ProtectRoutes>
          }
        />

        <Route
          path="/login"
          element={
            <OpenRoutes>
              <Login />
            </OpenRoutes>
          }
        />

        <Route
          path="/register"
          element={
            <OpenRoutes>
              <Register />
            </OpenRoutes>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
