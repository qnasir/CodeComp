import './Home.css'; // Add styles specifically for the Home component

const Home = () => {
  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to CodeMaster</h1>
          <p>Compete in coding challenges, improve your skills, and top the leaderboard!</p>
          <button className="cta-button">Start Coding</button>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <h2>Why CodeMaster?</h2>
        <div className="feature-cards">
          <div className="feature-card">
            <h3>Real-Time Challenges</h3>
            <p>Compete with others and solve real-time coding problems.</p>
          </div>
          <div className="feature-card">
            <h3>Interactive Leaderboard</h3>
            <p>Track your performance and rise up the global leaderboard.</p>
          </div>
          <div className="feature-card">
            <h3>Code Editor</h3>
            <p>Write and execute code directly in your browser with our advanced editor.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
