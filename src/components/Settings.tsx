import React, { useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { ALL_LETTERS, VOWELS, IMAGES } from '../utils/letterData';
import Button from './Button';

interface SettingsProps {
  onBack: () => void;
  onShowHome?: () => void;
  onShowGame?: () => void;
}

export interface SettingsRef {
  handleNavigationAttempt: (callback: () => void) => void;
}

const Settings = forwardRef<SettingsRef, SettingsProps>(({ onBack, onShowHome, onShowGame }, ref) => {
  const [selectedLetters, setSelectedLetters] = useLocalStorage<string[]>('selectedLetters', VOWELS);
  const [showWarning, setShowWarning] = useState(false);

  const handleLetterToggle = (letter: string) => {
    // Don't allow toggling inactive letters
    if (isLetterInactive(letter)) {
      return;
    }
    
    setSelectedLetters(prev => {
      const newSelection = prev.includes(letter) 
        ? prev.filter(l => l !== letter)
        : [...prev, letter];
      
      // Hide warning when a letter is selected
      if (newSelection.length > 0) {
        setShowWarning(false);
      }
      
      return newSelection;
    });
  };

  const handleSelectAll = () => {
    // Only select letters that have images available
    const availableLetters = ALL_LETTERS.filter(letter => !isLetterInactive(letter));
    setSelectedLetters(availableLetters);
    setShowWarning(false);
  };

  const handleDeselectAll = () => {
    setSelectedLetters([]);
  };

  const handleSelectVowels = () => {
    // Only select vowels that have images available
    const availableVowels = VOWELS.filter(letter => !isLetterInactive(letter));
    setSelectedLetters(availableVowels);
    setShowWarning(false);
  };

  const isLetterSelected = (letter: string) => selectedLetters.includes(letter);

  // Check if a letter has no images available in the IMAGES array
  const isLetterInactive = (letter: string) => {
    const letterLower = letter.toLowerCase();
    return !IMAGES.some(image => image.letter === letterLower);
  };

  // Get available (active) selected letters
  const getAvailableSelectedLetters = () => {
    return selectedLetters.filter(letter => !isLetterInactive(letter));
  };

  // Handle navigation attempts - show warning if no letters selected
  const handleNavigationAttempt = (callback: () => void) => {
    const availableLetters = getAvailableSelectedLetters();
    if (availableLetters.length === 0) {
      setShowWarning(true);
      return;
    }
    callback();
  };

  // Expose handleNavigationAttempt to parent component
  useImperativeHandle(ref, () => ({
    handleNavigationAttempt
  }));

  // Remove any inactive letters from selected letters on component mount
  useEffect(() => {
    setSelectedLetters(prev => prev.filter(letter => !isLetterInactive(letter)));
  }, []);

  return (
    <div className="flex flex-col items-center justify-start bg-gray-50 p-4 flex-1 pt-24">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl w-full">
        <h2 className="text-3xl font-bold text-center mb-6 text-blue-800">Einstellungen</h2>
        
        {showWarning && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded-r-lg">
            <div className="flex items-center">
              <div className="text-2xl mr-3">⚠️</div>
              <div>
                <p className="font-bold">Mindestens ein Buchstabe erforderlich</p>
                <p className="text-sm">
                  Bitte wähle mindestens einen Buchstaben aus, bevor du fortfährst.
                </p>
              </div>
            </div>
          </div>
        )}
        
        <div className="mb-6">          
          {/* Action Buttons */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            <Button
              onClick={handleSelectAll}
              variant="success"
              size="small"
            >
              Alle auswählen
            </Button>
            <Button
              onClick={handleSelectVowels}
              variant="primary"
              size="small"
            >
              Vokale auswählen
            </Button>
            <Button
              onClick={handleDeselectAll}
              variant="danger"
              size="small"
            >
              Alle abwählen
            </Button>
          </div>

          {/* Alphabet Grid */}
          <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 gap-2">
            {ALL_LETTERS.map(letter => {
              const inactive = isLetterInactive(letter);
              const selected = isLetterSelected(letter);
              
              return (
                <button
                  key={letter}
                  onClick={() => handleLetterToggle(letter)}
                  disabled={inactive}
                  className={`
                    flex justify-center w-12 h-12 rounded-lg font-bold text-lg transition-all border-2
                    ${inactive
                      ? 'bg-gray-200 text-gray-400 border-gray-300 cursor-not-allowed opacity-50'
                      : selected
                        ? 'bg-blue-500 text-white border-blue-600 shadow-md hover:bg-blue-600'
                        : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200'
                    }
                  `}
                  title={inactive ? `Keine Bilder für "${letter}" verfügbar` : ''}
                >
                  {letter}
                </button>
              );
            })}
          </div>
        </div>

        <button 
          onClick={() => handleNavigationAttempt(onBack)}
          className="w-full bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-4 rounded-lg transition-all"
        >
          ← Zurück zum Hauptmenü
        </button>
      </div>
    </div>
  );
});

Settings.displayName = 'Settings';

export default Settings;
