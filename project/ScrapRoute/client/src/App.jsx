import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Components
import ProtectedRoute from './components/ProtectedRoute';

// Pages - matching your sidebar exactly
import LandingPage from './pages/roleselection'; 
import Login from './pages/Login';
import Register from './pages/Register';
import SellerDashboard from './pages/seller/SDashboard';
import AdminDashboard from './pages/admin/ADashboard';
import FieldAgentDashboard from './pages/fieldagent/FADashboard'; // Folder is fieldagent
import VendorDashboard from './pages/vendor/VDashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/agent" element={<FieldAgentDashboard />} />
        <Route path="/vendor" element={<VendorDashboard />} />
        <Route path="/seller" element={<SellerDashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;