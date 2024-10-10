import readline from 'readline';
import { homedir } from 'os';

const { stdin, stdout } = process;

let username;
let workingDir = homedir();

const storeName = () => {
  const params = process.argv.slice(2);
  username = params[0].replace('--username=', '');
}

const startApp = () => {
  storeName();
  const greetingMessage = `Welcome to the File Manager, ${username}! \n`;
  const exitMessage = `Thank you for using File Manager, ${username}, goodbye! \n`;
  const currentDirMessage = `You are currently in ${workingDir} \n`;
  const rl = readline.createInterface(stdin, stdout);

  stdout.write(greetingMessage);
  stdout.write(currentDirMessage);

  rl.on('line', (data) => {
    if (data === '.exit') {
      process.exit();
    } else {
      stdout.write(currentDirMessage);
    }
  })
  process.on('exit', () => stdout.write(exitMessage));
}

startApp();