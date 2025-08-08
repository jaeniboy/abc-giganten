export interface ImageData {
    name: string;
    url: string;
    letter: string;
    selected?: boolean;
    correct?: boolean;
}

export interface GameState {
    currentLetter: string;
    images: ImageData[];
    score: number;
    correctlySelected: Set<string>;
    showTrophy: boolean;
}

export interface UserSettings {
    selectedLetters: string[];
    soundEnabled?: boolean;
}