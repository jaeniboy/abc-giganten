import React from 'react';
import { useGameState } from '../hooks/useGameState';
import LetterCard from './LetterCard';
import ScoreDisplay from './ScoreDisplay';
import Button from './Button';

const GameBoard: React.FC = () => {
    const { 
        currentLetter, 
        images, 
        score, 
        handleSelection, 
        showTrophy,
        correctlySelected,
        resetGame
    } = useGameState();

    // Helper function to capitalize only the first letter
    const capitalizeFirstLetter = (str: string): string => {
        if (!str) return '';
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    };

    if (showTrophy) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-yellow-300 to-yellow-500 p-4">
                <div className="text-6xl mb-4">🏆</div>
                <h1 className="text-3xl font-bold text-center mb-4">Glückwunsch!</h1>
                <p className="text-lg text-center mb-6">Du hast 5 Buchstaben geschafft!</p>
                <Button
                    onClick={resetGame}
                    variant="primary"
                    size="large"
                    className="shadow-lg"
                >
                    Nochmal spielen
                </Button>
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-screen bg-blue-50 p-4 pt-28">
            {/* Letter Display */}
            <div className="text-center mb-6 flex gap-4 justify-center">
                <div className="text-9xl font-bold mb-2 text-blue-800">
                    {capitalizeFirstLetter(currentLetter || '')}
                </div>
                <div className="text-9xl font-bold text-blue-600">
                    {currentLetter?.toLowerCase()}
                </div>
            </div>

            {/* Score Display */}
            <ScoreDisplay score={score} />

            {/* Images Grid */}
            <div className="flex grid grid-cols-3 gap-3 max-w-md mx-auto w-full">
                {images.map((image, index) => (
                    <LetterCard 
                        key={`${image.name}-${index}`}
                        image={image} 
                        onClick={() => handleSelection(image)}
                        isSelected={correctlySelected.has(image.name)}
                    />
                ))}
            </div>
        </div>
    );
};

export default GameBoard;