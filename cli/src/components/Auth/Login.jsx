import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './Login.css'; 

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    

    const userCredentials = {
      email,
      password
    };

    try {
      // Send POST request to login API

      const response = await fetch('http://localhost:5000/api/auth/login', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userCredentials)
      });

      if (!response.ok) {
        throw new Error('Failed to login');
      }

      const data = await response.json();

      // Save the JWT token in localStorage
      console.log(data)
      localStorage.setItem('token', data.token);
      localStorage.setItem('id', data.user.id)
      localStorage.setItem('username', data.user.username)
      localStorage.setItem('email', data.user.email)

      // Redirect to dashboard or home page
      navigate('/');
    } catch (err) {
      setError('Invalid email or password. Please try again.', err);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login to Your Account</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleLogin}>
          <div className="input-field">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-field">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-btn">Login</button>
        </form>
        <div className="login-links">
          <a href="/forgot-password" className="forgot-password">Forgot Password?</a>
          <p>
            Not registered? <a href="/signup">Create an account</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
