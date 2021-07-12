import JSZip from 'jszip';
import { FS } from "../services/FileSystem";
import { getFileTypeByPath } from './getFileType';
import { prettierText } from './prettier';

export const zip = async (projectName: string) => {
    const zip = new JSZip();
    const filesPaths = FS.getPathsFromFolderReq(projectName);
    console.log(filesPaths);
    await Promise.all(filesPaths
        .filter(filesPath => !filesPath.includes('node_modules'))
        .map(async filePath => {
            const content = FS.readFileSync(filePath, 'utf-8');

            const language = getFileTypeByPath(filePath);

            let formated = language === 'typescript' ? prettierText(content) : content;
            if (getFileTypeByPath(filePath) === 'image') {
                formated = await (await fetch(formated)).arrayBuffer();
            }
            zip.file(filePath.replace(`/${projectName}/`, ''), formated);
            return;
        }))
    return await zip.generateAsync({ type: "blob" });
}

export const unzip = async (buffer: ArrayBuffer) => {
    const zip = new JSZip();
    return await zip.loadAsync(buffer);
}