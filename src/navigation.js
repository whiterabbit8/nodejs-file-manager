import { access, readdir } from 'fs/promises';
import { showCurrentDir, store } from "./index.js";

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
    .catch(() => console.log(`Operation failed: path ${newDir} does not exist.`))
    .finally(() => showCurrentDir())
}

const showList = async () => {
  const list = [];

  await readdir(store.workingDir, { withFileTypes: true })
    .then((files) => {
      files.forEach((file) => {
        if (file.isDirectory()) {
          list.push({ 'Name': file.name, 'Type': 'directory' });
        } else {
          list.push({ 'Name': file.name, 'Type': 'file' });
        }
      });
      list.sort((a, b) => {
        return a.Type.localeCompare(b.Type);
      })
      console.table(list);
    })
    .catch((err) => console.log('Operation failed'))
    .finally(() => showCurrentDir())
}

export {
  goUp,
  goToPath,
  showList
};