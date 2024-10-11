import { store } from "./index.js";

const goUp = () => {
  const separator = store.workingDir.includes('/') ? '/' : '\\';
  const dirsArr = store.workingDir.split(separator);
  const newDirsArr = dirsArr.slice(0, -1);
  store.workingDir = newDirsArr.length > 1
    ? newDirsArr.join(separator)
    : newDirsArr[0] + separator;
}

export {
  goUp
};