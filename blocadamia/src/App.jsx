import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import Shell from './components/layout/Shell';
import ProtectedRoute from './components/layout/ProtectedRoute';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import Payments from './pages/Payments';
import Budgets from './pages/Budgets';
import Loans from './pages/Loans';
import Reputation from './pages/Reputation';
import Profile from './pages/Profile';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />
  <Route path="/app" element={<ProtectedRoute><Shell><Dashboard /></Shell></ProtectedRoute>} />
  <Route path="/app/payments" element={<ProtectedRoute><Shell><Payments /></Shell></ProtectedRoute>} />
  <Route path="/app/budgets" element={<ProtectedRoute><Shell><Budgets /></Shell></ProtectedRoute>} />
  <Route path="/app/loans" element={<ProtectedRoute><Shell><Loans /></Shell></ProtectedRoute>} />
  <Route path="/app/reputation" element={<ProtectedRoute><Shell><Reputation /></Shell></ProtectedRoute>} />
  <Route path="/app/profile" element={<ProtectedRoute><Shell><Profile /></Shell></ProtectedRoute>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <ToastContainer position="top-right" />
    </>
  );
}
