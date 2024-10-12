import { useNavigate } from 'react-router-dom';
import "./Home.css"

const Home = () => {
  const navigate = useNavigate();

  const handleStartCoding = () => {
    navigate('/select-difficulty');
  };

  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to CodeMaster</h1>
          <p>Compete in coding challenges, improve your skills, and top the leaderboard!</p>
          <button className="cta-button" onClick={handleStartCoding}>
            Start Coding
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;
