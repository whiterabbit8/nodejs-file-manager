import readline from 'readline';
import { homedir } from 'os';
import { goUp, goToPath, showList } from './navigation.js';
import { createFile, printFile, renameFile } from './fs.js';

const { stdin, stdout } = process;

const store = {
  username: '',
  workingDir: homedir(),
  separator: homedir().includes('/') ? '/' : '\\',
};

const storeName = () => {
  const params = process.argv.slice(2);
  store.username = params[0].replace('--username=', '');
}

const showCurrentDir = (dir = store.workingDir) => {
  const currentDirMessage = `You are currently in ${dir} \n\n`;
  stdout.write(currentDirMessage);
}

const startApp = () => {
  storeName();
  const greetingMessage = `Welcome to the File Manager, ${store.username}! \n`;
  const exitMessage = `\nThank you for using File Manager, ${store.username}, goodbye! \n`;
  const rl = readline.createInterface(stdin, stdout);

  stdout.write(greetingMessage);
  showCurrentDir();

  rl.on('line', (data) => {
    if (data === '.exit') {
      process.exit();
    } else if (data.trim() === 'up') {
      goUp();
    } else if (data.startsWith('cd')) {
      goToPath(data);
    } else if (data.trim() === 'ls') {
      showList();
    } else if (data.startsWith('cat')) {
      printFile(data);
    } else if (data.startsWith('add')) {
      createFile(data);
    } else if (data.startsWith('rn')) {
      renameFile(data);
    }
    else if (data !== '') {
      console.log('Operation failed: unknown command');
      showCurrentDir();
    }
  })
  process.on('exit', () => stdout.write(exitMessage));
}

startApp();

export {
  store,
  showCurrentDir,
}