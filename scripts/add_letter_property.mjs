import { readFileSync, writeFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function getLetterForWord(name) {
  const specialPrefixes = [
    { prefix: 'Sch', letter: 'sch' },
    { prefix: 'St', letter: 'st' },
    { prefix: 'Sp', letter: 'sp' },
    { prefix: 'Pf', letter: 'pf' },
    { prefix: 'Ei', letter: 'ei' },
    { prefix: 'Eu', letter: 'eu' },
    { prefix: 'Au', letter: 'au' }
  ];

  // Check for special prefixes first (case-sensitive)
  for (const special of specialPrefixes) {
    if (name.startsWith(special.prefix)) {
      return special.letter;
    }
  }

  // Default: return first letter in lowercase
  return name.charAt(0).toLowerCase();
}

// Read the current letterData.ts file
const letterDataPath = path.join(__dirname, '..', 'src', 'utils', 'letterData.ts');
let content = readFileSync(letterDataPath, 'utf8');

// Replace each object to add the letter property
content = content.replace(
  /{ name: '([^']+)', url: '([^']+)' }/g,
  (match, name, url) => {
    const letter = getLetterForWord(name);
    return `{ name: '${name}', url: '${url}', letter: '${letter}' }`;
  }
);

// Write the updated file
writeFileSync(letterDataPath, content);

console.log('✅ Added "letter" property to all IMAGES objects');
console.log('   Special prefixes handled: Sch, St, Sp, Pf, Ei, Eu, Au');
console.log('   All other words use their first letter in lowercase');

// Show some examples of the transformation
const examples = [
  'Affe', 'Schaf', 'Stern', 'Spinne', 'Pfau', 'Eisbär', 'Europa', 'Auto'
];

console.log('\n📋 Examples:');
examples.forEach(name => {
  const letter = getLetterForWord(name);
  console.log(`   ${name} → letter: "${letter}"`);
});
