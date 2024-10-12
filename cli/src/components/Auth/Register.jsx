import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css'; // Import the CSS file for styling

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(''); // Reset error on new submission

    // Simple password matching validation
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Prepare registration data
    const newUser = {
      username,
      email,
      password
    };

    try {
      // Send POST request to your backend API
      const response = await fetch('http://localhost:5000/api/auth/register', { // Replace with your API URL
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUser)
      });

      if (!response.ok) {
        throw new Error('Failed to register');
      }

      const data = await response.json();

      // Save the JWT token in localStorage
      localStorage.setItem('token', data.token);

      // If successful, set success message or redirect to login page
      setSuccess('Registration successful! Redirecting to login...');
      setTimeout(() => {
        navigate('/login');
      }, 2000); // Redirect to login after 2 seconds

    } catch (err) {
      setError('Failed to register. Please try again.', err);
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h2>Create an Account</h2>
        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}
        <form onSubmit={handleRegister}>
          <div className="input-field">
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
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
          <div className="input-field">
            <label>Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="register-btn">Register</button>
        </form>
        <div className="register-links">
          <p>
            Already have an account? <a href="/login">Login here</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
