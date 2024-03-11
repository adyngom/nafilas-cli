#!/usr/bin/env node
import * as p from '@clack/prompts';
import color from 'picocolors';
import Conf from 'conf';
import fs from 'node:fs/promises';
import path from 'node:path';
import wrap from 'wrap-ansi';

const __dirname = path.dirname(new URL(import.meta.url).pathname);

const surasData = JSON.parse(await fs.readFile(path.join(__dirname, 'data', 'suras.json'), 'utf-8'));
const nafilasData = JSON.parse(await fs.readFile(path.join(__dirname, 'data','nafilas.json'), 'utf-8'));

async function main() {
  console.clear();

  p.intro(`${color.bgCyan(color.black(' Nafilas du mois de Ramadan - 2024 '))}`);

  const config = new Conf({ projectName: 'nafilas' });
  const lastNight = config.get('lastNight', 1);

  const night = await p.group(
    {
      night: () =>
        p.text({
        message: 'Nuit du Ramadan (1-30)?',
        placeholder: lastNight.toString(),
        validate: value => {
          const number = parseInt(value, 10);
          if (isNaN(number)) {
            return 'Please enter a number';
          }
          if (number < 1 || number > 30) {
            return 'Please enter a number between 1 and 30';
          }
        }
      }),
    },
    {
      onCancel: () => {
        p.cancel('Operation cancelled.');
        process.exit(0);
      },
    }
  );

const sequence = nafilasData.find(({ night: n }) => n === parseInt(night.night));
  
const getSuraEnglishName = (suraNumber) => {
    const sura = surasData.find((s) => s.number === suraNumber);
    return sura ? sura.englishName : `Surah ${suraNumber}`;
  };

  if (sequence) {
    config.set('lastNight', parseInt(night.night, 10));
    const sequenceText = `Rakkas: ${sequence.rakkas}\nSallama: ${sequence.sallama}\n\nSuras:\n${sequence.recite.map(({ suraNumber, times }) => `- ${getSuraEnglishName(suraNumber)} (${times} time${times > 1 ? 's' : ''})`).join('\n')}\n\n${sequence.rewards}`;
    const wrappedSequenceText = wrap(sequenceText, 80); // Wrap the text to a width of 80 characters
    p.note(
      wrappedSequenceText, 
      color.yellow(`Nafila ${sequence.name}:`)
    );
  }  else {
    p.log.warn('Sorry, no recommended sequence found for the entered night.');
  }

  p.outro(color.magenta(`Problems? ${color.underline(color.cyan('https://example.com/issues'))}`));
}

main().catch(console.error);