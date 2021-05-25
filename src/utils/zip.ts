import JSZip from 'jszip';
import path from 'path';
import { IFile } from '../interfaces';
import { readFileSync } from "../services";
import { getFileType } from './getFileType';
import { prettierText } from './prettier';

export const zip = async (fileSystem: IFile[]) => {
    const zip = new JSZip();
    fileSystem
        .filter(file => !file.isFolder)
        .forEach(file => {
            const content = readFileSync(path.resolve(file.path, file.name), 'utf-8');

            const language = getFileType(file);

            const formated = language === 'typescript' ? prettierText(content) : content;

            zip.file(path.resolve(file.path, file.name), formated);
        })
    return await zip.generateAsync({ type: "blob" });
}

export const unzip = async (buffer: ArrayBuffer) => {
    const zip = new JSZip();
    return await zip.loadAsync(buffer);
}