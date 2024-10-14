import fs from 'fs';
import { writeFile } from 'fs/promises';
import { showCurrentDir, store } from './index.js';

const { stdout } = process;

const printFile = async (command) => {
  if (command.trim().length === 3) {
    console.log('Invalid input: please enter the path.');
    showCurrentDir();
    return;
  }

  const printedDir = command.replace('cat', '').trim();
  const dir = printedDir[1] === ':' ? printedDir : `${store.workingDir}${store.separator}${printedDir}`;

  const readStream = fs.createReadStream(dir);
  readStream
    .on('error', () => console.log(`Operation failed: path ${dir} does not exist. \n`))
    .on('data', (chunk) => stdout.write('\n' + chunk + '\n\n'))
    .on('end', () => showCurrentDir());
}

const createFile = async (command) => {
  if (command.trim().length === 3) {
    console.log('Invalid input: please enter the file name.');
    showCurrentDir();
    return;
  }

  const fileName = command.replace('add', '').trim();
  const dir = `${store.workingDir}${store.separator}${fileName}`;

  fs.writeFile(dir, '', (err) => {
    if (err) {
      console.log(`Operation failed\n`, err)
    } else {
      console.log('File saved!');
    }
    showCurrentDir();
  })
}

export {
  printFile,
  createFile,
}