import React from 'react';

interface ScoreDisplayProps {
  score: number;
}

const ScoreDisplay: React.FC<ScoreDisplayProps> = ({ score }) => {
  return (
    <div className="flex justify-center mb-4">
      <div className="bg-white rounded-full px-6 py-2 shadow-md">
        <div className="flex items-center gap-2">
          <span className="text-2xl">⭐</span>
          <span className="text-xl font-bold text-blue-800">{score}</span>
        </div>
      </div>
    </div>
  );
};

export default ScoreDisplay;