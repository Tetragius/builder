
import './Shim';
import { Volume, IFs } from 'memfs';
import path from 'path';
class _FS {

  vol: IFs;

  constructor() {
    //@ts-ignore
    this.vol = Volume.fromJSON({});
  }

  readFileAsync = async (path: string, format: BufferEncoding = 'utf8'): Promise<any> => new Promise(resolve => {
    const file = this.vol.readFileSync(path, format);
    resolve(file);
  })

  readFileSync = (path: string, format: BufferEncoding = 'utf8') => this.vol.readFileSync(path, format);
  writeFileSync = (name: string, data: any) => this.vol.writeFileSync(name, data);

  writeFileAsync = async (name: string, data: any) => {
    return new Promise(resolve => {
      this.vol.writeFile(name, data, resolve);
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

  getFilesPathFromFolder = (dirPath: string): string[] =>
    this.vol.readdirSync(dirPath)
      .map((name) => path.join(dirPath, name))
      .filter(filePath => this.vol.statSync(filePath).isFile());

  getPathsFromFolder = (dirPath: string): string[] => {
    const list: any = this.isDirectory(dirPath) &&
      this.vol.readdirSync(dirPath)
        .map(name => path.resolve(dirPath, name));
    return list || [];
  }

  getPathsFromFolderReq = (dirPath: string): string[] => {
    const list: string[] = [];
    const subList: any[] = this.vol.readdirSync(dirPath);

    const filesPath = subList.map(name => path.resolve(dirPath, name)).filter(path => this.vol.statSync(path).isFile());
    const folderPath = subList.map(name => path.resolve(dirPath, name)).filter(path => !this.vol.statSync(path).isFile());

    list.push(...filesPath);

    folderPath.forEach(path => list.push(...this.getPathsFromFolderReq(path)));
    return list

  }

  rename = (oldPath, newPath) => this.vol.renameSync(oldPath, newPath);

  isFile = (path) => this.vol.statSync(path).isFile();

  isDirectory = (path) => this.vol.statSync(path).isDirectory();

  //@ts-ignore
  getVol = () => this.vol.toJSON();

  setVol = (json) => this.vol.fromJSON(json);
}

export const FS = window.parent['fs'] ?? new _FS();
window['fs'] = FS;