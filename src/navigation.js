import { access } from 'fs/promises';
//import path from 'path';
//import { fileURLToPath } from 'url';
import { showCurrentDir, store } from "./index.js";

//const __dirname = path.dirname(fileURLToPath(import.meta.url));

const goUp = async () => {
  const dirsArr = store.workingDir.split(store.separator);
  const newDirsArr = dirsArr.slice(0, -1);
  store.workingDir = newDirsArr.length > 1
    ? newDirsArr.join(store.separator)
    : newDirsArr[0] + store.separator;
  showCurrentDir();
}

const goToPath = async (command) => {
  if (command.trim().length === 2) {
    console.log('Invalid input: please enter the path.');
    showCurrentDir();
    return;
  }

  const dir = command.replace('cd', '').trim();
  const newDir = dir[1] === ':' ? dir : `${store.workingDir}${store.separator}${dir}`;

  await access (newDir)
    .then(() => store.workingDir = newDir)
    .catch(() => console.log(`Invalid input: path ${newDir} does not exist.`))
    .finally(() => showCurrentDir())
}

export {
  goUp,
  goToPath,
};