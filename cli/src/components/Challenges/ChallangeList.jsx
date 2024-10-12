import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ChallengeList = () => {
  const [challenges, setChallenges] = useState([]);

  useEffect(() => {
    const fetchChallenges = async () => {
      const res = await axios.get('http://localhost:5000/api/questions');
      setChallenges(res.data);
    };
    fetchChallenges();
  }, []);

  return (
    <div>
      <h1>Coding Challenges</h1>
      <ul>
        {challenges.map((challenge) => (
          <li key={challenge._id}>
            <Link to={`/challenges/${challenge._id}`}>{challenge.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChallengeList;
