import React from 'react';
import { Link } from 'react-router-dom';

const GameSelect: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-blue-100">
            <h1 className="text-4xl font-bold mb-4">Wählen Sie ein Spiel</h1>
            <p className="mb-8">Wählen Sie einen Spielmodus, um mit dem Lernen der Buchstaben zu beginnen!</p>
            <div className="flex flex-col space-y-4">
                <Link to="/letter-learning" className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">
                    Buchstaben lernen
                </Link>
                <Link to="/another-game-mode" className="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600">
                    Anderer Spielmodus
                </Link>
            </div>
        </div>
    );
};

export default GameSelect;