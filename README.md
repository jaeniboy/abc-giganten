# abc-giganten

## Overview
abc-giganten is a web application designed to teach preschool children letters through interactive gameplay. The application provides a fun and engaging way for young learners to recognize letters and associate them with images.

## Features
- Interactive gameplay that helps children learn letters.
- Multiple game modes for varied learning experiences.
- User-friendly interface suitable for preschool children.
- Score tracking to encourage progress and engagement.

## Project Structure
The project is organized into the following main directories:

- **src**: Contains all the source code for the application.
  - **components**: Reusable components such as GameBoard, LetterCard, NavigationBar, and ScoreDisplay.
  - **pages**: Different pages of the application including Home, GameSelect, and LetterLearning.
  - **hooks**: Custom hooks for managing game state and local storage.
  - **utils**: Utility functions for game logic and letter data.
  - **styles**: Global styles for the application.
  - **types**: TypeScript types and interfaces for type safety.
  - **App.tsx**: Main application component that sets up routing.
  - **main.tsx**: Entry point of the application.

- **public**: Contains static files such as the main HTML file and favicon.

- **package.json**: Configuration for npm, including dependencies and scripts.

- **vite.config.ts**: Configuration for Vite, specifying build options.

- **tailwind.config.js**: Configuration for Tailwind CSS.

- **tsconfig.json**: TypeScript configuration file.

## Setup Instructions
1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```
   cd abc-giganten
   ```
3. Install dependencies:
   ```
   npm install
   ```
4. Start the development server:
   ```
   npm run dev
   ```
5. Open your browser and go to `http://localhost:3000` to view the application.

## Contributing
Contributions are welcome! Please feel free to submit a pull request or open an issue for any suggestions or improvements.

## License
This project is licensed under the MIT License. See the LICENSE file for more details.