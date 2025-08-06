import React from 'react';
import NavigationBar from '../components/NavigationBar';

const Home: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-blue-100">
            <NavigationBar />
            <h1 className="text-4xl font-bold mb-4">Willkommen bei ABC Giganten!</h1>
            <p className="text-lg mb-8">Lerne die Buchstaben durch interaktive Spiele.</p>
            <p className="text-md">Wähle ein Spiel, um zu beginnen!</p>
        </div>
    );
};

export default Home;