import { useState } from 'react';

export default function AdminLogin({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    const expectedUsername = import.meta.env.VITE_ADMIN_USERNAME || 'admin';
    const expectedPassword = import.meta.env.VITE_ADMIN_PASSWORD || 'admin123';

    if (username === expectedUsername && password === expectedPassword) {
      localStorage.setItem('admin_auth', 'true');
      setErrorMsg('');
      onLoginSuccess();
    } else {
      setErrorMsg('Invalid username or password.');
    }
  };

  return (
    <div className="form-container admin-login-container">
      <div className="form-header">
        <h1>Admin Portal</h1>
        <p className="form-description">Please log in to view the student registrations.</p>
      </div>

      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            autoComplete="username"
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
          />
        </div>

        {errorMsg && (
          <div className="auth-error-message">
            {errorMsg}
          </div>
        )}

        <div className="form-submit">
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
}
