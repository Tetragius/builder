import fs from 'fs';
import path from 'path';

//@ts-ignore
fs.vol.fromJSON({}, '/');

export const readFileAsync = async (path: string): Promise<any> => new Promise(resolve => {
  const file = fs.readFileSync(path, 'utf8');
  resolve(file);
})

export const readFileSync = (path: string, format: BufferEncoding) => fs.readFileSync(path, format);
export const writeFileSync = (name: string, data: string | ArrayBuffer) => fs.writeFileSync(name, data as string | NodeJS.ArrayBufferView);

export const writeFileAsync = async (name: string, data: string | ArrayBuffer) => {
  return new Promise(resolve => {
    fs.writeFile(name, data as string | NodeJS.ArrayBufferView, resolve);
  })
}

export const mkdirSync = (path: string, opt?: any) => fs.mkdirSync(path, opt);
export const existsSync = (path: string) => fs.existsSync(path);

export const mkdirSyncReqFoeFile = (filePath: string) => {
  const dirName = path.dirname(filePath);
  fs.mkdirSync(dirName, { recursive: true });
}