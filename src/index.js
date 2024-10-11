import readline from 'readline';
import { homedir } from 'os';
import { goUp, goToPath } from './navigation.js';

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
  const exitMessage = `Thank you for using File Manager, ${store.username}, goodbye! \n`;
  const rl = readline.createInterface(stdin, stdout);

  stdout.write(greetingMessage);
  showCurrentDir();

  rl.on('line', (data) => {
    if (data === '.exit') {
      process.exit();
    } else if (data === 'up') {
      goUp();
    } else if (data.startsWith('cd')) {
      goToPath(data);
    }
  })
  process.on('exit', () => stdout.write(exitMessage));
}

startApp();

export {
  store,
  showCurrentDir,
}