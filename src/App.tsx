import React, { useState } from 'react';
import NavigationBar from './components/NavigationBar';
import GameBoard from './components/GameBoard';
import Settings from './components/Settings';

type AppScreen = 'home' | 'game' | 'settings';

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('home');

  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return (
          <div className="flex flex-col items-center justify-center bg-gradient-to-b from-blue-100 to-purple-100 p-4 flex-1">
            <div className="text-center">
              <h1 className="text-6xl font-bold text-blue-800 mb-4">🔤</h1>
              <h2 className="text-4xl font-bold text-blue-800 mb-6">ABC Giganten</h2>
              <p className="text-lg text-gray-600 mb-8 max-w-md">
                Lerne spielerisch das Alphabet! Finde die Bilder, die mit dem gezeigten Buchstaben beginnen.
              </p>
              <button 
                onClick={() => setCurrentScreen('game')}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-8 rounded-full text-xl shadow-lg transition-all"
              >
                🎮 Spiel starten
              </button>
            </div>
          </div>
        );
      case 'game':
        return <GameBoard />;
      case 'settings':
        return <Settings onBack={() => setCurrentScreen('home')} />;
      default:
        return null;
    }
  };

  return (
    <div className="app flex flex-col min-h-screen">
      <NavigationBar 
        onShowHome={() => setCurrentScreen('home')}
        onShowGame={() => setCurrentScreen('game')}
        onShowSettings={() => setCurrentScreen('settings')}
      />
      <div className="flex-1 flex flex-col">
        {renderScreen()}
      </div>
    </div>
  );
};

export default App;