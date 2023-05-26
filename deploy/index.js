const util = require('util');
const child_process = require('child_process');
const exec = util.promisify(child_process.exec);
const appPath = join(__dirname, 'app');
 
const runClean = async function () {
 // cwd指定子进程的当前工作目录 这里的rm -rf build为删除指定目录下的一个文件夹
  await exec(`rm -rf `, { cwd: appPath });
  await exec(`rm -rf test`, { cwd: appPath });
}
runClean()