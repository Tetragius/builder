import path from 'path';
import { IFile } from '../interfaces';
import { uniqueId } from '../services/Core';
import { FS } from "../services/FileSystem"; 1
import { IStyle } from "../store/meta/style";
import { camelToKebab } from "./camelToKebab";

const asNoneValues = ['none', 'normal', 'unset'];

export type Importer = { importName: string, file: IFile };
type Result = [IStyle, Importer[]]

const extractValue = (value: any) => {
    if (value?.path) {
        const file = value as IFile;
        const url = value ? FS.readFileSync(path.resolve(file.path, file.name)) : '';
        const importName = `img_${uniqueId()}`;
        return [url, importName];
    }

    return [value, '']
}

export const styleFormatter = (styles: IStyle, replaceUrls: boolean = true): Result => {

    const formated = {};
    const imports: Importer[] = [];

    for (const style in styles) {

        if (!styles[style].value || asNoneValues.includes(styles[style].value)) {
            continue;
        }

        if (styles[style].unionName) {
            if (!formated[styles[style].unionName]) {
                formated[styles[style].unionName] = '';
            }
            const [value, importName] = extractValue(styles[style].value)
            formated[styles[style].unionName] += value ? `${styles[style].camelCase ? style : camelToKebab(style)}(${replaceUrls && importName ? `\$\{${importName}\}` : value}${styles[style].demension ?? ''}) ` : '';
            if (!replaceUrls && importName) {
                imports.push({ importName, file: styles[style].value });
            }
            continue;
        }

        if (styles[style].allowAssetsUrl) {
            const [value, importName] = extractValue(styles[style].value)
            formated[style] = replaceUrls ? `url(${value})` : `url(\$\{${importName}\})`;
            if (!replaceUrls) {
                imports.push({ importName, file: styles[style].value });
            }
            continue;
        }

        if (!styles[style].unionName) {
            const value = styles[style].value;
            const nan = isNaN(parseInt(value));
            formated[style] = `${value}${nan ? '' : styles[style].demension ?? ''}`;
        }

        //defaults

        if (style === 'outlineWidth' && !styles[style]) {
            formated[style] = `1px`;
        }

        if (style === 'outlineColor' && !styles[style]) {
            formated[style] = `blue`;
        }

        if (style === 'outlineStyle' && !styles[style]) {
            formated[style] = `solid`;
        }

    }
    return [formated, imports];
}

export const clearFromPositionsStyles = (style) => {
    const forbiden = [
        'left',
        'top',
        'margin',
        'padding',
        'border',
        'outline',
        'background',
        'transform',
        'filter'
    ];
    return Object.entries(style).reduce((result, [key, value]) => {
        if (!forbiden.some(f => key.includes(f))) {
            result[key] = value;
        }
        return result;
    }, {})
}