
import './Shim';
import { Volume } from 'memfs';
import path from 'path';
class _FS {

  vol: typeof Volume;

  constructor() {
    //@ts-ignore
    this.vol = Volume.fromJSON({ '/foo': 'bar' });
  }

  readFileAsync = async (path: string): Promise<any> => new Promise(resolve => {
    const file = this.vol.readFileSync(path, 'utf8');
    resolve(file);
  })

  readFileSync = (path: string, format: BufferEncoding) => this.vol.readFileSync(path, format);
  writeFileSync = (name: string, data: string | ArrayBuffer) => this.vol.writeFileSync(name, data as string | NodeJS.ArrayBufferView);

  writeFileAsync = async (name: string, data: string | ArrayBuffer) => {
    return new Promise(resolve => {
      this.vol.writeFile(name, data as string | NodeJS.ArrayBufferView, resolve);
    })
  }

  mkdirSync = (path: string, opt?: any) => this.vol.mkdirSync(path, opt);
  existsSync = (path: string) => this.vol.existsSync(path);

  async getFiles(dir) {
    const dirents = await this.vol.promises.readdir(dir, { withFileTypes: true });
    const files = await Promise.all(dirents.map((dirent) => {
      const res = path.resolve(dir, dirent.name);
      return dirent.isDirectory() ? this.getFiles(res) : res;
    }));
    return Array.prototype.concat(...files);
  }

  mkdirSyncReq = (dirPath: string) => {
    this.vol.mkdirSync(dirPath, { recursive: true });
  }

  mkdirSyncReqFoeFile = (filePath: string) => {
    const dirPath = path.dirname(filePath);
    this.mkdirSyncReq(dirPath);
  }

  removeFolder = (path: string) => {
    this.vol.rmdirSync(path, { recursive: true });
  }

  //@ts-ignore
  getVol = () => this.vol.toJSON();
  
  setVol = (json) => this.vol.fromJSON(json);

}

export const FS = new _FS();