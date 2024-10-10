import readline from 'readline';
const { stdin, stdout } = process;

let username;

const storeName = () => {
  const params = process.argv.slice(2);
  username = params[0].replace('--username=', '');
}

const startApp = () => {
  storeName();
  const greetingMessage = `Welcome to the File Manager, ${username}! \n`;
  const exitMessage = `Thank you for using File Manager, ${username}, goodbye! \n`;

  const rl = readline.createInterface(stdin, stdout);

  stdout.write(greetingMessage);
  rl.on('line', (data) => {
    if (data === '.exit') {
      process.exit();
    }
  })
  process.on('exit', () => stdout.write(exitMessage));
}

startApp();