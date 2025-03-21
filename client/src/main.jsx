import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import RegisterForm from './auth/register';
import LoginForm from './auth/login';
import { DashboardPage } from './pages/dashboard';

createRoot(document.getElementById('root')).render(
  <StrictMode>
 <BrowserRouter>
        <Routes>
          {/* Redirect root to login */}
          <Route path="/" element={<Navigate to="/login" />} />

          {/* Routes without Layout */}
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/login" element={<LoginForm />} />

        <Route path="/dashboard" element={<DashboardPage />} />

        </Routes>
      </BrowserRouter>
  </StrictMode>,
)
