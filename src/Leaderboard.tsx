import React from 'react';

const Leaderboard = ({ leaderboard }) => {
  return (
    <div className="leaderboard mt-4">
      <h2 className="text-2xl">Leaderboard</h2>
      <table className="text-white w-full">
        <thead>
          <tr>
            <th>Name</th>
            <th>Difficulty</th>
            <th>Score</th>
            <th>Time</th>
            <th>Accuracy</th>
          </tr>
        </thead>
        <tbody>
          {leaderboard.map((user, index) => (
            <tr key={index}>
              <td>{user.username}</td>
              <td>{user.difficulty}</td>
              <td>{user.score} points</td>
              <td>{user.time} sec</td>
              <td>{user.accuracy}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
