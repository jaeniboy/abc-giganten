import { IMAGES } from '../src/utils/letterData.js';
import { getRandomImages, isCorrectImage } from '../src/utils/gameLogic.js';

// Test the new letter-based logic
console.log('🧪 Testing Letter-Based Image Selection');
console.log('=====================================');

// Test cases to verify the logic works correctly
const testCases = [
    { letter: 'e', expectedCorrect: ['elefant', 'ente', 'erdbeere', 'eule'], expectedIncorrect: ['eimer', 'einhorn', 'eisbär'] },
    { letter: 'ei', expectedCorrect: ['eimer', 'einhorn'], expectedIncorrect: ['elefant', 'ente'] },
    { letter: 'au', expectedCorrect: ['auto'], expectedIncorrect: ['affe', 'ananas', 'apfel'] },
    { letter: 'sch', expectedCorrect: ['schaf'], expectedIncorrect: ['stern', 'spinne'] }
];

testCases.forEach(testCase => {
    console.log(`\n📝 Testing letter: "${testCase.letter}"`);
    
    // Get all images for this letter
    const correctImages = IMAGES.filter(img => img.letter === testCase.letter.toLowerCase());
    const incorrectImages = IMAGES.filter(img => img.letter !== testCase.letter.toLowerCase());
    
    console.log(`   ✅ Correct images (${correctImages.length}):`, correctImages.map(img => img.name).slice(0, 5).join(', '));
    
    // Test some specific expected images
    testCase.expectedCorrect.forEach(imageName => {
        const image = IMAGES.find(img => img.name.toLowerCase().includes(imageName));
        if (image) {
            const isCorrect = isCorrectImage(image, testCase.letter);
            console.log(`   ${isCorrect ? '✅' : '❌'} "${image.name}" should be correct for "${testCase.letter}": ${isCorrect}`);
        }
    });
    
    testCase.expectedIncorrect.forEach(imageName => {
        const image = IMAGES.find(img => img.name.toLowerCase().includes(imageName));
        if (image) {
            const isCorrect = isCorrectImage(image, testCase.letter);
            console.log(`   ${!isCorrect ? '✅' : '❌'} "${image.name}" should be incorrect for "${testCase.letter}": ${!isCorrect}`);
        }
    });
});

console.log('\n🎯 Summary: Game logic now uses the "letter" property instead of name-based matching');
console.log('   This ensures proper categorization of compound sounds like "ei", "au", "sch", etc.');
