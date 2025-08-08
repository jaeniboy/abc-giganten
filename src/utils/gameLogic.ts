import { ImageData } from '../types';
import { IMAGES } from './letterData';

export const getRandomImages = (letter: string): ImageData[] => {
    const letterLower = letter.toLowerCase();
    
    const correctImages = IMAGES.filter(image => 
        image.letter === letterLower
    );
    
    const incorrectImages = IMAGES.filter(image => 
        image.letter !== letterLower
    );

    // Ensure at least 1 correct image, but not more than available
    const maxCorrect = Math.min(correctImages.length, 4); // Max 4 correct out of 8 total
    const numCorrect = Math.max(1, Math.floor(Math.random() * maxCorrect) + 1);
    const numIncorrect = 6 - numCorrect;

    const selectedCorrect = correctImages
        .sort(() => Math.random() - 0.5)
        .slice(0, numCorrect);
    
    const selectedIncorrect = incorrectImages
        .sort(() => Math.random() - 0.5)
        .slice(0, numIncorrect);

    return [...selectedCorrect, ...selectedIncorrect]
        .sort(() => Math.random() - 0.5);
};

export const isCorrectImage = (image: ImageData, letter: string): boolean => {
    return image.letter === letter.toLowerCase();
};