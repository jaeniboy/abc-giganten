import { useState, useEffect, useCallback, useRef } from 'react';
import useLocalStorage from './useLocalStorage';
import { getRandomImages, isCorrectImage } from '../utils/gameLogic';
import { ImageData } from '../types';
import { VOWELS } from '../utils/letterData';

export const useGameState = () => {
    // Guard to prevent double next-round
    const nextRoundTimeoutRef = useRef<any>(null);
    const [selectedLetters] = useLocalStorage<string[]>('selectedLetters', VOWELS);
    const [currentLetter, setCurrentLetter] = useState<string>('');
    const [images, setImages] = useState<ImageData[]>([]);
    const [score, setScore] = useState<number>(0);
    const [correctlySelected, setCorrectlySelected] = useState<Set<string>>(new Set());
    const [showTrophy, setShowTrophy] = useState<boolean>(false);
    const [usedLetters, setUsedLetters] = useState<string[]>([]);

    // Initialize game with random letter
    const initializeGame = useCallback(() => {
        const availableLetters = selectedLetters.filter((letter: string) => !usedLetters.includes(letter));
        
        if (availableLetters.length === 0) {
            // Reset if all letters used
            setUsedLetters([]);
            setScore(0);
            return;
        }

        const randomLetter = availableLetters[Math.floor(Math.random() * availableLetters.length)];
        setCurrentLetter(randomLetter);
        setImages(getRandomImages(randomLetter));
        setCorrectlySelected(new Set());
    }, [selectedLetters, usedLetters]);

    // Handle image selection
    const handleSelection = useCallback((image: ImageData) => {
        setCorrectlySelected(prev => {
            if (prev.has(image.name)) {
                return prev; // Already selected
            }
            if (isCorrectImage(image, currentLetter)) {
                return new Set([...prev, image.name]);
            }
            return prev;
        });
        // For wrong selections, we don't do anything special (no visual feedback yet)
    }, [currentLetter]);
    // Effect to handle next round logic when all correct images are selected
    useEffect(() => {
        const correctImages = images.filter(img => isCorrectImage(img, currentLetter));
        if (
            correctImages.length > 0 &&
            correctImages.every(img => correctlySelected.has(img.name))
        ) {
            // Only run next round logic once per round
            if (nextRoundTimeoutRef.current) {
                clearTimeout(nextRoundTimeoutRef.current);
            }
            const newScore = score + 1;
            setScore(newScore);
            setUsedLetters(prev => [...prev, currentLetter]);

            if (newScore % 5 === 0) {
                setShowTrophy(true);
                nextRoundTimeoutRef.current = setTimeout(() => {
                    setShowTrophy(false);
                    initializeGame();
                    nextRoundTimeoutRef.current = null;
                }, 3000);
            } else {
                nextRoundTimeoutRef.current = setTimeout(() => {
                    initializeGame();
                    nextRoundTimeoutRef.current = null;
                }, 1000);
            }
        }
        // Cleanup on unmount
        return () => {
            if (nextRoundTimeoutRef.current) {
                clearTimeout(nextRoundTimeoutRef.current);
                nextRoundTimeoutRef.current = null;
            }
        };
    }, [correctlySelected, images, currentLetter, score, initializeGame]);

    // Initialize game on mount
    useEffect(() => {
        if (selectedLetters.length > 0) {
            initializeGame();
        }
    }, [initializeGame]);

    return {
        currentLetter,
        images,
        score,
        correctlySelected,
        showTrophy,
        handleSelection,
        initializeGame
    };
};