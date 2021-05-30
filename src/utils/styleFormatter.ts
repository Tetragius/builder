import path from 'path';
import { IFile } from '../interfaces';
import { uniqueId } from '../services/Core';
import { FS } from "../services/FileSystem"; 1
import { IStyle } from "../store/meta/style";
import { camelToKebab } from "./camelToKebab";

const asNoneValues = ['none', 'normal', 'unset', 'auto'];

export type Importer = { importName: string, file: IFile };
type Result = [IStyle, Importer[]]

export const styleFormatter = (styles: IStyle, replaceUrls: boolean = true): Result => {

    const formated = {};
    const imports: Importer[] = [];

    for (const style in styles) {
        if (!styles[style].value || asNoneValues.includes(styles[style].value)) {
            continue;
        }
        if (styles[style].allowAssetsUrl) {
            const file = styles[style].value as IFile;
            const url = styles[style].value ? FS.readFileSync(path.resolve(file.path, file.name)) : '';
            const importName = `img_${uniqueId()}`;
            formated[style] = replaceUrls ? `url(${url})` : `url(\$\{${importName}\})`;
            if (!replaceUrls) {
                imports.push({ importName, file: styles[style].value });
            }
            continue;
        }
        if (!styles[style].unionName) {
            formated[style] = `${styles[style].value}${styles[style].demension ?? ''}`;
        }
        if (style === 'outlineWidth' && !styles[style]) {
            formated[style] = `1px`;
        }
        if (style === 'outlineColor' && !styles[style]) {
            formated[style] = `blue`;
        }
        if (style === 'outlineStyle' && !styles[style]) {
            formated[style] = `solid`;
        }
        if (styles[style].unionName) {
            if (!formated['filter']) {
                formated['filter'] = '';
            }
            formated['filter'] += styles[style].value ? `${camelToKebab(style)}(${styles[style].value}${styles[style].demension ?? ''}) ` : '';
        }
    }
    return [formated, imports];
}