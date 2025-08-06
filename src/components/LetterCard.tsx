import React, { useState } from 'react';
import { ImageData } from '../types';

interface LetterCardProps {
    image: ImageData;
    onClick: () => void;
    isSelected?: boolean;
}

const LetterCard: React.FC<LetterCardProps> = ({ image, onClick, isSelected = false }) => {
    const [isShaking, setIsShaking] = useState(false);

    const handleClick = () => {
        if (isSelected) return; // Don't allow clicking already selected correct images
        
        onClick();
        
        // Add shake animation for incorrect selections
        // This will be handled by parent component's logic
    };

    return (
        <div 
            className={`
                relative bg-white rounded-lg p-3 cursor-pointer transition-all duration-200 
                hover:shadow-lg active:scale-95 border-2
                ${isSelected ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:border-blue-300'}
                ${isShaking ? 'animate-pulse' : ''}
            `}
            onClick={handleClick}
        >
            <div className="aspect-square flex items-center justify-center">
                <img 
                    src={image.url} 
                    alt={image.name}
                    className="max-w-full max-h-full object-contain"
                    loading="lazy"
                />
            </div>
            
            {/* Green checkmark for correct selections */}
            {isSelected && (
                <div className="absolute top-1 right-1 bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">
                    ✓
                </div>
            )}
            
            {/* Image name for accessibility */}
            <p className="text-xs text-center mt-1 text-gray-600 font-medium">
                {image.name}
            </p>
        </div>
    );
};

export default LetterCard;