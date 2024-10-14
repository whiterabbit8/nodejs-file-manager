import fs from 'fs';
import { rename } from 'fs/promises';
import { showCurrentDir, store } from './index.js';

const { stdout } = process;

const printFile = async (command) => {
  if (command.trim().length === 3) {
    console.log('Invalid input: please enter the path.\n');
    showCurrentDir();
    return;
  }

  const printedDir = command.replace('cat', '').trim();
  const dir = printedDir[1] === ':' ? printedDir : `${store.workingDir}${store.separator}${printedDir}`;

  const readStream = fs.createReadStream(dir);
  readStream
    .on('error', () => console.log(`Operation failed: path ${dir} does not exist.\n`))
    .on('data', (chunk) => stdout.write('\n' + chunk + '\n\n'))
    .on('end', () => showCurrentDir());
}

const createFile = async (command) => {
  if (command.trim().length === 3) {
    console.log('Invalid input: please enter the file name.\n');
    showCurrentDir();
    return;
  }

  const fileName = command.replace('add', '').trim();
  const dir = `${store.workingDir}${store.separator}${fileName}`;

  fs.writeFile(dir, '', (err) => {
    if (err) {
      console.log('Operation failed\n');
    } else {
      console.log('File saved!\n');
    }
    showCurrentDir();
  })
}

const renameFile = async (command) => {
  if (command.trim().length === 2) {
    console.log('Invalid input: please enter the file path and new file name.\n');
    showCurrentDir();
    return;
  } else if (command.replace(/  +/g, ' ').split(' ').length < 3) {
    console.log('Invalid input: please enter new file name.\n');
    return;
  }

  const printedDir = command.replace(/  +/g, ' ').trim().split(' ')[1];
  const dir = printedDir[1] === ':' ? printedDir : `${store.workingDir}${store.separator}${printedDir}`;
  const newName = `${store.workingDir}${store.separator}${command.trim().split(' ').pop()}`;

  fs.cp(dir, newName, { recursive: true }, (err) => {
    if (err) {
      console.log(`Operation failed: path ${dir} does not exist.`);
    } else {
      console.log('File renamed!');
      fs.unlink(dir, (err) => {
        if (err) console.log(err)
      });
    }
    showCurrentDir();
  })
}

export {
  printFile,
  createFile,
  renameFile
}