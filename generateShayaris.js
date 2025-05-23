const fs = require('fs');

// Templates for shayaris
const templates = {
  love: [
    {
      urdu: (word1, word2) => `${word1} سے دل کی دھڑکن بڑھتی ہے\n${word2} میں بس تیری ہی بات ہوتی ہے`,
      english: (word1, word2) => `With ${word1}, my heartbeat rises,\nin ${word2}, it’s only you I speak of.`
    },
    {
      urdu: (word1, word2) => `تیری ${word1} میں ڈوبا ہے دل میرا\n${word2} کے بغیر ادھورا ہے یہ سفر`,
      english: (word1, word2) => `My heart is lost in your ${word1},\nwithout ${word2}, this journey is incomplete.`
    },
    // Add more templates for variety
    {
      urdu: (word1, word2) => `${word1} کی چاہت دل کو بے قرار کرے\n${word2} کے بغیر یہ دل بے ثبات رہے`,
      english: (word1, word2) => `The desire for ${word1} makes my heart restless,\nwithout ${word2}, this heart remains unsteady.`
    }
  ],
  friendship: [
    {
      urdu: (word1, word2) => `دوست وہ جو ${word1} میں ساتھ نبھائے\n${word2} کے پل میں مسکراہٹ لائے`,
      english: (word1, word2) => `A friend who stands by in ${word1},\nbrings smiles in moments of ${word2}.`
    },
    {
      urdu: (word1, word2) => `دوستی کی ${word1} ہے انمول\n${word2} کے ساتھ زندگی ہے گوہر`,
      english: (word1, word2) => `The ${word1} of friendship is priceless,\nwith ${word2}, life is a gem.`
    }
  ],
  sad: [
    {
      urdu: (word1, word2) => `${word1} میں چھپا ہے درد میرا\n${word2} کے بغیر دل ہے ویران`,
      english: (word1, word2) => `My pain is hidden in ${word1},\nwithout ${word2}, my heart is desolate.`
    },
    {
      urdu: (word1, word2) => `آنسوؤں کی ${word1} کوئی نہ جانے\n${word2} میں بس دل ہی روئے`,
      english: (word1, word2) => `No one knows the ${word1} of tears,\nin ${word2}, only the heart weeps.`
    }
  ],
  inspirational: [
    {
      urdu: (word1, word2) => `${word1} سے ہر مشکل آسان ہوتی ہے\n${word2} کے ساتھ زندگی مسکراتی ہے`,
      english: (word1, word2) => `With ${word1}, every difficulty becomes easy,\nwith ${word2}, life smiles.`
    },
    {
      urdu: (word1, word2) => `ہر ${word1} کے بعد ایک نئی صبح آتی ہے\n${word2} سے زندگی نئی راہ پاتی ہے`,
      english: (word1, word2) => `After every ${word1}, a new dawn comes,\nwith ${word2}, life finds a new path.`
    }
  ]
};

// Keywords for randomization
const keywords = {
  love: [
    ['محبت', 'love'], ['یاد', 'memory'], ['نظر', 'glance'], ['چاہت', 'desire'], ['دل', 'heart'],
    ['رنگ', 'color'], ['جذبات', 'emotions'], ['خواب', 'dream'], ['راز', 'secret'], ['جنون', 'passion']
  ],
  friendship: [
    ['دوستی', 'friendship'], ['رشتہ', 'bond'], ['ہنسی', 'laughter'], ['اعتماد', 'trust'], ['ساتھ', 'companionship'],
    ['یادیں', 'memories'], ['سچ', 'truth'], ['محبت', 'love'], ['خوشی', 'happiness'], ['درد', 'pain']
  ],
  sad: [
    ['تنہائی', 'loneliness'], ['درد', 'pain'], ['یادیں', 'memories'], ['آنسو', 'tears'], ['خاموشی', 'silence'],
    ['زخم', 'wound'], ['غم', 'sorrow'], ['رات', 'night'], ['دل', 'heart'], ['اداسی', 'sadness']
  ],
  inspirational: [
    ['ہمت', 'courage'], ['خواب', 'dream'], ['روشنی', 'light'], ['صبح', 'dawn'], ['امید', 'hope'],
    ['زندگی', 'life'], ['فتح', 'victory'], ['عزم', 'resolve'], ['راستہ', 'path'], ['جذبہ', 'passion']
  ]
};

// Generate shayaris
function generateShayaris(category, count) {
  const shayaris = [];
  const categoryTemplates = templates[category];
  const categoryKeywords = keywords[category];

  for (let i = 0; i < count; i++) {
    const template = categoryTemplates[Math.floor(Math.random() * categoryTemplates.length)];
    const [word1Urdu, word1English] = categoryKeywords[Math.floor(Math.random() * categoryKeywords.length)];
    const [word2Urdu, word2English] = categoryKeywords[Math.floor(Math.random() * categoryKeywords.length)];
    
    shayaris.push({
      id: `${category}-${i + 1}`,
      category,
      urdu: template.urdu(word1Urdu, word2Urdu),
      english: template.english(word1English, word2English)
    });
  }
  return shayaris;
}

// Generate 500 shayaris per category
const categories = ['love', 'friendship', 'sad', 'inspirational'];
const allShayaris = [];
categories.forEach(category => {
  allShayaris.push(...generateShayaris(category, 500));
});

// Write to shayaris.js
const fileContent = `const shayaris = ${JSON.stringify(allShayaris, null, 2)};\n`;
fs.writeFileSync('shayaris.js', fileContent);
console.log('Generated shayaris.js with 2000+ shayaris.');