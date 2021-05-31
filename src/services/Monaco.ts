import path from 'path';
import * as _monaco from 'monaco-editor';
import { IFile } from '../interfaces';
import { getFileType } from '../utils/getFileType';
import { prettierText } from '../utils/prettier';
import { FS } from './FileSystem';

class _Monaco {

    monaco = _monaco;

    constructor() {
        this.monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
            jsx: this.monaco.languages.typescript.JsxEmit.React,
            baseUrl: './',
        });
    }

    createEditor = (ref: HTMLDivElement, model?: monaco.editor.ITextModel): monaco.editor.IStandaloneCodeEditor => {
        return this.monaco.editor.create(ref, {
            theme: "vs-dark",
            automaticLayout: true,
            model: model
        }) as monaco.editor.IStandaloneCodeEditor;
    }

    createModel = (file: IFile) => {
        if (!file.isFolder) {
            const language = getFileType(file);
            const data = FS.readFileSync(path.resolve(file.path, file.name), 'utf-8');
            const formated = language === 'typescript' ? prettierText(data) : data;
            file.model = this.monaco.editor.createModel(formated, 'typescript', this.monaco.Uri.parse(`file://${file.path}/${file.name}`));
            this.monaco.editor.setModelLanguage(file.model, language);
        }
    }

    updateModel = (file?: IFile) => {
        if (file && !file.isFolder) {
            const language = getFileType(file);
            const data = FS.readFileSync(path.resolve(file.path, file.name), 'utf-8');
            const formated = language === 'typescript' ? prettierText(data) : data;
            file.model?.setValue(formated);
        }
    }

    removeModel = (file: IFile) => {
        if (!file.isFolder) {
            file.model?.dispose();
        }
    }
}

export const Monaco = new _Monaco()