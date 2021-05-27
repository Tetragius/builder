
import './Shim';
import fs from 'fs';
import path from 'path';
class _FS {

  constructor() {
    //@ts-ignore
    fs.vol.fromJSON({}, '/');
  }

  readFileAsync = async (path: string): Promise<any> => new Promise(resolve => {
    const file = fs.readFileSync(path, 'utf8');
    resolve(file);
  })

  readFileSync = (path: string, format: BufferEncoding) => fs.readFileSync(path, format);
  writeFileSync = (name: string, data: string | ArrayBuffer) => fs.writeFileSync(name, data as string | NodeJS.ArrayBufferView);

  writeFileAsync = async (name: string, data: string | ArrayBuffer) => {
    return new Promise(resolve => {
      fs.writeFile(name, data as string | NodeJS.ArrayBufferView, resolve);
    })
  }

  mkdirSync = (path: string, opt?: any) => fs.mkdirSync(path, opt);
  existsSync = (path: string) => fs.existsSync(path);

  async getFiles(dir) {
    const dirents = await fs.promises.readdir(dir, { withFileTypes: true });
    const files = await Promise.all(dirents.map((dirent) => {
      const res = path.resolve(dir, dirent.name);
      return dirent.isDirectory() ? this.getFiles(res) : res;
    }));
    return Array.prototype.concat(...files);
  }

  mkdirSyncReq = (dirPath: string) => {
    fs.mkdirSync(dirPath, { recursive: true });
  }

  mkdirSyncReqFoeFile = (filePath: string) => {
    const dirPath = path.dirname(filePath);
    this.mkdirSyncReq(dirPath);
  }

}

export const FS = new _FS();