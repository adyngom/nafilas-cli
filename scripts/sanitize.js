// const fs = require('fs');
// const path = require('path');

import fs from 'node:fs';
import path from 'node:path';

const __dirname = path.dirname(new URL(import.meta.url).pathname);

// Read the suras mapping
const surasMapping = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'suras-mapping.json'), 'utf-8'));

// Create a map of wolofName to suraNumber
const suraNumberMap = surasMapping.reduce((map, sura) => {
  map[sura.wolofName] = sura.number;
  return map;
}, {});

// Read the nafilas data
const nafilasData = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'nafilas-updated.json'), 'utf-8'));

// Prepare an array to store the diff
let diff = [];

// Correct the suraNumber values
nafilasData.forEach(nafila => {
  nafila.recite.forEach(recitation => {
    if (suraNumberMap[recitation.suraName] && recitation.suraNumber !== suraNumberMap[recitation.suraName]) {
      // Store the old and new suraNumber in the diff
      diff.push(`- ${recitation.suraName}: ${recitation.suraNumber} -> ${suraNumberMap[recitation.suraName]}`);
      // Update the suraNumber
      recitation.suraNumber = suraNumberMap[recitation.suraName];
    }
  });
});

// Write the corrected data back to nafilas-updated.json
fs.writeFileSync(path.join(__dirname, 'data','nafilas-cleaned.json'), JSON.stringify(nafilasData, null, 2));

// Write the diff to a Markdown file
fs.writeFileSync(path.join(__dirname, 'data','diff.md'), diff.join('\n'));