import React, { useState, useRef } from 'react';
import NavigationBar from './components/NavigationBar';
import GameBoard from './components/GameBoard';
import Settings, { SettingsRef } from './components/Settings';
import ReloadPrompt from './components/ReloadPrompt';
import InstallPrompt from './components/InstallPrompt';
import './styles/pwa.css';

type AppScreen = 'home' | 'game' | 'settings';

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('home');
  const settingsRef = useRef<SettingsRef>(null);

  // Handle navigation with validation when on settings screen
  const handleNavigation = (target: AppScreen) => {
    if (currentScreen === 'settings' && settingsRef.current) {
      settingsRef.current.handleNavigationAttempt(() => setCurrentScreen(target));
    } else {
      setCurrentScreen(target);
    }
  };

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
                onClick={() => handleNavigation('game')}
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
        return <Settings 
          ref={settingsRef}
          onBack={() => handleNavigation('home')} 
          onShowHome={() => handleNavigation('home')}
          onShowGame={() => handleNavigation('game')}
        />;
      default:
        return null;
    }
  };

  return (
    <div className="app flex flex-col min-h-screen">
      <NavigationBar 
        onShowHome={() => handleNavigation('home')}
        onShowGame={() => handleNavigation('game')}
        onShowSettings={() => handleNavigation('settings')}
      />
      <div className="flex-1 flex flex-col">
        {renderScreen()}
      </div>
      <ReloadPrompt />
      <InstallPrompt />
    </div>
  );
};

export default App;