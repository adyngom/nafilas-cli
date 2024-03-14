#!/usr/bin/env node
import * as p from '@clack/prompts';
import color from 'picocolors';
import chalk from 'chalk';
import Conf from 'conf';
import fs from 'node:fs/promises';
import path from 'node:path';
import wrap from 'wrap-ansi';

const __dirname = path.dirname(new URL(import.meta.url).pathname);

// Load data asynchronously to avoid blocking the event loop
let surasData, nafilasData;
const loadData = async () => {
  surasData = JSON.parse(await fs.readFile(path.join(__dirname, 'data', 'suras.json'), 'utf-8'));
  nafilasData = JSON.parse(await fs.readFile(path.join(__dirname, 'data', 'nafilas.json'), 'utf-8'));
};

// Helper function to get the English name of a surah
const getSuraEnglishName = (suraNumber) => {
  const sura = surasData.find((s) => s.number === suraNumber);
  return sura ? sura.englishName : `Surah ${suraNumber}`;
};

const displayNafilaSequence = (sequence, surasData) => {
  const sequenceText = `${color.bold('Rakkas:')} ${sequence.rakkas} - ${color.bold('Sallama:')} ${sequence.sallama}\n\n${color.bold('Suras:')}\n\n${sequence.recite
    .map(({ suraNumber, times }) => `- ${color.green(getSuraEnglishName(suraNumber, surasData))} (${color.cyan(times)} fois)`)
    .join('\n')}\n\n${chalk.white('Récompenses:')}\n\n${chalk.hex("#ffa500")(wrap(sequence.rewards, 125, { hard: true, trim: false }))}`;

  const wrappedSequenceText = wrap(sequenceText, 125, { hard: true, trim: false });

  //p.note(wrappedSequenceText, chalk.yellowBright(`Nafila ${sequence.name}:`));
  //p.outro(wrappedSequenceText);
  p.outro(chalk.yellowBright(`Nafila ${sequence.name}:`));
  p.outro(wrappedSequenceText);
};

// Helper function to validate user input
const validateNightInput = (value) => {
  const number = parseInt(value, 10);
  if (isNaN(number)) {
    return 'Please enter a number';
  }
  if (number < 1 || number > 30) {
    return 'Please enter a number between 1 and 30';
  }
};

// Main function
const main = async () => {
  try {
    // Load data asynchronously
    await loadData();

    console.clear();

    p.intro(`${color.bgCyan(color.black(' Nafilas du mois de Ramadan - 2024 '))}`);

    const config = new Conf({ projectName: 'nafilas' });
    const lastNight = config.get('lastNight', 1);

    const night = await p.group(
      {
        night: () =>
          p.text({
            message: color.magenta('Nuit du Ramadan (1-30)?'),
            defaultValue: lastNight.toString(),
            validate: validateNightInput,
          }),
      },
      {
        onCancel: () => {
          p.cancel('Operation cancelled.');
          process.exit(0);
        },
      }
    );

    const nightNumber = parseInt(night.night, 10);
    const sequence = nafilasData.find(({ night: n }) => n === nightNumber);

    if (sequence) {
      config.set('lastNight', nightNumber);
      displayNafilaSequence(sequence);
    } else {
      p.log.warn('Sorry, no recommended sequence found for the entered night.');
    }

    p.outro(color.magenta(`Suggestions? ${color.underline(color.cyan('https://github.com/adyngom/nafilas-cli/issues'))}`));
  } catch (error) {
    console.error('An error occurred:', error);
  }
};

main().catch(console.error);