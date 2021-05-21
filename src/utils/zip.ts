import JSZip from 'jszip';
import { readFileSync } from "../services";
import { getFileType } from './getFileType';
import { prettierText } from './prettier';
import { reconstructPath } from "./reconstructPath";

export const zip = async (fileSystem) => {
    const zip = new JSZip();;
    fileSystem.filter(file => !file.isFolder).forEach(file => {
        const path = reconstructPath(file, fileSystem);
        const content = readFileSync(path, 'utf-8');

        const language = getFileType(file);

        const formated = language === 'typescript' ? prettierText(content) : content;

        zip.file(path, formated);
    })
    return await zip.generateAsync({ type: "blob" });
}