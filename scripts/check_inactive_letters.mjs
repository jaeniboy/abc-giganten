import { ALL_LETTERS, IMAGES } from '../src/utils/letterData.js';

// Check which letters are inactive (have no images)
const inactiveLetters = [];
const activeLetters = [];

ALL_LETTERS.forEach(letter => {
  const letterLower = letter.toLowerCase();
  const hasImages = IMAGES.some(image => image.letter === letterLower);
  
  if (hasImages) {
    activeLetters.push(letter);
  } else {
    inactiveLetters.push(letter);
  }
});

console.log('📊 Letter Status Report');
console.log('=====================');
console.log(`✅ Active letters (${activeLetters.length}): ${activeLetters.join(', ')}`);
console.log(`❌ Inactive letters (${inactiveLetters.length}): ${inactiveLetters.join(', ')}`);

if (inactiveLetters.length > 0) {
  console.log('\n⚠️  Inactive letters will be displayed as disabled in the Settings component');
  console.log('   They cannot be selected and will show a tooltip explaining why');
} else {
  console.log('\n🎉 All letters have images available!');
}
