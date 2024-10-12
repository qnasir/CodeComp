import { useEffect, useState } from 'react';
import axios from 'axios';
import CodeEditor from './CodeEditor';

const ChallengeDetail = ({ match }) => {
  const [challenge, setChallenge] = useState(null);

  useEffect(() => {
    const fetchChallenge = async () => {
      const res = await axios.get(`http://localhost:5000/api/questions/${match.params.id}`);
      setChallenge(res.data);
    };
    fetchChallenge();
  }, [match.params.id]);

  if (!challenge) return <p>Loading...</p>;

  return (
    <div>
      <h1>{challenge.title}</h1>
      <p>{challenge.description}</p>
      <CodeEditor questionId={challenge._id} />
    </div>
  );
};

export default ChallengeDetail;
