import { ImageData } from '../types';
import { IMAGES } from './letterData';

export const getRandomImages = (letter: string): ImageData[] => {
    const correctImages = IMAGES.filter(image => 
        startsWithLetter(image.name, letter)
    );
    
    const incorrectImages = IMAGES.filter(image => 
        !startsWithLetter(image.name, letter)
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
    return startsWithLetter(image.name, letter);
};

const startsWithLetter = (word: string, letter: string): boolean => {
    const wordLower = word.toLowerCase();
    const letterLower = letter.toLowerCase();
    
    // Handle compound sounds
    switch (letterLower) {
        case 'eu':
            return wordLower.startsWith('eu');
        case 'ei':
            return wordLower.startsWith('ei');
        case 'st':
            return wordLower.startsWith('st');
        case 'sp':
            return wordLower.startsWith('sp');
        case 'sch':
            return wordLower.startsWith('sch');
        case 'pf':
            return wordLower.startsWith('pf');
        default:
            return wordLower.startsWith(letterLower);
    }
};