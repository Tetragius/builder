import JSZip from 'jszip';
import path from 'path';
import { IFile } from '../interfaces';
import { FS } from "../services/FileSystem";
import { getFileType } from './getFileType';
import { prettierText } from './prettier';

const base64ToArrayBuffer = (base64) => {
    const binary_string = atob(base64);
    const len = binary_string.length;
    const bytes = new Uint8Array(len);
    for (var i = 0; i < len; i++) {
        bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes.buffer;
}

export const zip = async (projectName: string, fileSystem: IFile[]) => {
    const zip = new JSZip();
    await Promise.all(fileSystem
        .filter(file => !file.isFolder)
        .filter(file => !file.path.includes('node_modules'))
        .map(async file => {
            const content = FS.readFileSync(path.resolve(file.path, file.name), 'utf-8');

            const language = getFileType(file);

            const formated = language === 'typescript' ? prettierText(content) : content;
            if (file.type === 'image') {
                const arrayBuffer = await (await fetch(content)).arrayBuffer();
                zip.file(path.resolve(file.path, file.name).replace(`/${projectName}/`, ''), arrayBuffer);
                return;
            } else {
                zip.file(path.resolve(file.path, file.name).replace(`/${projectName}/`, ''), formated);
            }
        }))
    return await zip.generateAsync({ type: "blob" });
}

export const unzip = async (buffer: ArrayBuffer) => {
    const zip = new JSZip();
    return await zip.loadAsync(buffer);
}