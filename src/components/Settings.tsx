import React from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { ALL_LETTERS, VOWELS } from '../utils/letterData';
import Button from './Button';

interface SettingsProps {
  onBack: () => void;
}

const Settings: React.FC<SettingsProps> = ({ onBack }) => {
  const [selectedLetters, setSelectedLetters] = useLocalStorage<string[]>('selectedLetters', VOWELS);

  const handleLetterToggle = (letter: string) => {
    setSelectedLetters(prev => {
      if (prev.includes(letter)) {
        return prev.filter(l => l !== letter);
      } else {
        return [...prev, letter];
      }
    });
  };

  const handleSelectAll = () => {
    setSelectedLetters(ALL_LETTERS);
  };

  const handleDeselectAll = () => {
    setSelectedLetters([]);
  };

  const handleSelectVowels = () => {
    setSelectedLetters(VOWELS);
  };

  const isLetterSelected = (letter: string) => selectedLetters.includes(letter);

  return (
    <div className="flex flex-col items-center justify-start bg-gray-50 p-4 flex-1 pt-24">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl w-full">
        <h2 className="text-3xl font-bold text-center mb-6 text-blue-800">Einstellungen</h2>
        
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
            {ALL_LETTERS.map(letter => (
              <button
                key={letter}
                onClick={() => handleLetterToggle(letter)}
                className={`
                  w-12 h-12 rounded-lg font-bold text-lg transition-all border-2
                  ${isLetterSelected(letter)
                    ? 'bg-blue-500 text-white border-blue-600 shadow-md'
                    : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200'
                  }
                `}
              >
                {letter}
              </button>
            ))}
          </div>
        </div>

        <button 
          onClick={onBack}
          className="w-full bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-4 rounded-lg transition-all"
        >
          ← Zurück zum Hauptmenü
        </button>
      </div>
    </div>
  );
};

export default Settings;
