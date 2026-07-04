import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import StudentForm from './components/StudentForm';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import './App.css';

function App() {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

  // Sync session authentication status from localStorage on startup
  useEffect(() => {
    const authStatus = localStorage.getItem('admin_auth');
    if (authStatus === 'true') {
      setIsAdminAuthenticated(true);
    }
  }, []);

  const handleLoginSuccess = () => {
    setIsAdminAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_auth');
    setIsAdminAuthenticated(false);
  };

  return (
    <BrowserRouter>
      <main className="app-container">
        <Routes>
          {/* Public Student Registration Form Route */}
          <Route path="/" element={<StudentForm />} />

          {/* Admin Area Route */}
          <Route
            path="/admin"
            element={
              isAdminAuthenticated ? (
                <AdminDashboard onLogout={handleLogout} />
              ) : (
                <AdminLogin onLoginSuccess={handleLoginSuccess} />
              )
            }
          />

          {/* Catch-all redirect to Home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
