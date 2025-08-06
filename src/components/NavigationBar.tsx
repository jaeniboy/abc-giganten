import React from 'react';

interface NavigationBarProps {
    onShowSettings?: () => void;
    onShowGame?: () => void;
    onShowHome?: () => void;
}

const NavigationBar: React.FC<NavigationBarProps> = ({ 
    onShowSettings, 
    onShowGame, 
    onShowHome 
}) => {
    return (
        <nav className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 shadow-lg fixed top-0 w-full z-10">
            <div className="max-w-md mx-auto flex justify-between items-center">
                <h1 className="text-white text-xl font-bold">ABC Giganten</h1>
                <div className="flex gap-2">
                    <button 
                        onClick={onShowHome}
                        className="bg-white bg-opacity-20 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-opacity-30 transition-all"
                    >
                        🏠 Start
                    </button>
                    <button 
                        onClick={onShowGame}
                        className="bg-white bg-opacity-20 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-opacity-30 transition-all"
                    >
                        🎮 Spiel
                    </button>
                    <button 
                        onClick={onShowSettings}
                        className="bg-white bg-opacity-20 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-opacity-30 transition-all"
                    >
                        ⚙️ Einstellungen
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default NavigationBar;