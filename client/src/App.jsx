import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import ProtectRoutes from './components/ProtectRoutes';
import OpenRoutes from './components/OpenRoutes';
import Menu from './pages/Menu';
import Cart from './pages/Cart';
import Contact from './pages/Contact';
import AdminPanel from './pages/AdminPanel';
import AdminOverview from './components/Admin/AdminOverview';
import Tables from './components/Admin/Tables';
import AdminMenu from './components/Admin/AdminMenu';
import Orders from './components/Admin/Orders';
import Payment from './components/Admin/Payment';
import Navbar from './components/Navbar';
import TrackOrder from './pages/TrackOrder';

const App = () => {
  const location = useLocation();
  const hideNavbarRoutes = ["/admin", "/admin/tables", "/admin/menu", "/admin/orders", "/admin/payment"];
  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);

  return (
    <>
      {!shouldHideNavbar && <Navbar />}
      <div style={{ paddingTop: !shouldHideNavbar ? "64px" : "0px" }}>
        <Routes>
          {/* Public / Open Routes */}
          <Route path="/" element={<OpenRoutes><Home /></OpenRoutes>} />
          <Route path="/login" element={<OpenRoutes><Login /></OpenRoutes>} />
          <Route path="/register" element={<OpenRoutes><Register /></OpenRoutes>} />

          {/* Protected User Routes */}
          <Route path="/home" element={<ProtectRoutes><Home /></ProtectRoutes>} />
          <Route path="/menu" element={<ProtectRoutes><Menu /></ProtectRoutes>} />
          <Route path="/cart" element={<ProtectRoutes><Cart /></ProtectRoutes>} />
          <Route path="/contact" element={<ProtectRoutes><Contact /></ProtectRoutes>} />
          <Route path="/track-order" element={<ProtectRoutes><TrackOrder /></ProtectRoutes>} />

          {/* Admin Routes */}
          <Route path="/admin/*" element={<ProtectRoutes><AdminPanel /></ProtectRoutes>}>
            <Route index element={<AdminOverview />} />
            <Route path="tables" element={<Tables />} />         
            <Route path="menu" element={<AdminMenu />} />       
            <Route path="orders" element={<Orders />} />       
            <Route path="payment" element={<Payment />} />      
          </Route>
        </Routes>
      </div>
    </>
  );
};

export default App;
