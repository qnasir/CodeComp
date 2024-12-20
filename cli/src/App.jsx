import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Footer from './components/Footer';
import Login from './components/Auth/Login';
import Profile from './pages/Profile';
import './App.css';
import ProtectedRoute from './components/ProtectedRoute';
import SelectMode from './pages/SelectMode';
import ForgotPassword from './components/Auth/ForgotPassword';
import Register from './components/Auth/Register';
import CodingPage from './pages/CodingPage';

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route 
            path="/select-difficulty" 
            element={
              <ProtectedRoute>
                <SelectMode />
              </ProtectedRoute>
            } 
          />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/code-editor" element={<CodingPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
