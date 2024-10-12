import { Link } from 'react-router-dom';
import './Navbar.css';  // Add styles specifically for Navbar

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">CodeMaster</Link>
        <ul className="nav-menu">
          <li><Link to="/" className="nav-link">Home</Link></li>
          <li><Link to="/challenges" className="nav-link">Challenges</Link></li>
          <li><Link to="/leaderboard" className="nav-link">Leaderboard</Link></li>
          <li><Link to="/profile" className="nav-link">Profile</Link></li>
          <li><Link to="/login" className="nav-link">Login</Link></li>
          <li><Link to="/register" className="nav-link nav-link-button">Sign Up</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
