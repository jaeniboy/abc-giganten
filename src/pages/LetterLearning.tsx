import React from 'react';
import GameBoard from '../components/GameBoard';
import NavigationBar from '../components/NavigationBar';

const LetterLearning: React.FC = () => {
    return (
        <div className="flex flex-col items-center">
            <NavigationBar />
            <h1 className="text-2xl font-bold mt-4">Lerne die Buchstaben!</h1>
            <GameBoard />
        </div>
    );
};

export default LetterLearning;