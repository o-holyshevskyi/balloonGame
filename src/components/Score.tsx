// components/Score.tsx
import React from 'react';

type ScoreProps = {
  score: number;
};

const Score: React.FC<ScoreProps> = ({ score }) => (
  <div style={{ fontSize: '1.5rem', marginBottom: '10px' }}>
    Рахунок: {score}
  </div>
);

export default Score;
