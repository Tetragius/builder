import * as _monaco from 'monaco-editor';
import { getFileTypeByPath } from '../utils/getFileType';
import { prettierText } from '../utils/prettier';
import { FS } from './FileSystem';

interface IFileModels {
    [x: string]: _monaco.editor.ITextModel;
}
class _Monaco {

    monaco: typeof _monaco = _monaco;
    files: IFileModels = {};
    editor: _monaco.editor.IStandaloneCodeEditor;

    constructor() {

        this.monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
            noSemanticValidation: true,
            noSyntaxValidation: false
        });

        this.monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
            jsx: this.monaco.languages.typescript.JsxEmit.React,
            allowNonTsExtensions: true,
            moduleResolution: this.monaco.languages.typescript.ModuleResolutionKind.NodeJs,
            module: this.monaco.languages.typescript.ModuleKind.CommonJS,
            noEmit: true,
            esModuleInterop: true,
            typeRoots: ["node_modules/@types"],
            baseUrl: './',
        });

        ['react', 'react-dom', 'react-router-dom', 'styled-components'].forEach(this.loaStaticdDTS);

    }

    loaStaticdDTS = (libName) => {
        const xhr = new XMLHttpRequest();
        xhr.open('get', `/${libName}.d.ts`, false);
        xhr.send();
        this.monaco.languages.typescript.typescriptDefaults.addExtraLib(xhr.response, `file:///node_modules/@types/${libName}/index.d.ts`);
    }

    createEditor = (ref: HTMLDivElement, model?: _monaco.editor.ITextModel): _monaco.editor.IStandaloneCodeEditor => {
        this.editor = this.monaco.editor.create(ref, {
            theme: "vs-dark",
            automaticLayout: true,
            model: model
        }) as _monaco.editor.IStandaloneCodeEditor;
        return this.editor;
    }

    createModel = (path: string) => {
        if (!this.files[path]) {
            const language = getFileTypeByPath(path);
            const data = FS.readFileSync(path, 'utf-8');
            const formated = language === 'typescript' ? prettierText(data) : data;
            this.files[path] = this.monaco.editor.createModel(formated, 'typescript', this.monaco.Uri.parse(`file://${path}`));
            this.monaco.editor.setModelLanguage(this.files[path], language);
        }
        return this.files[path];
    }

    updateModel = (path: string) => {
        const language = getFileTypeByPath(path);
        const data = FS.readFileSync(path, 'utf-8');
        const formated = language === 'typescript' ? prettierText(data) : data;
        const file = this.files[path];
        if (file?.getValue() !== formated) {
            const position = this.editor?.getPosition();
            file?.setValue(formated);
            position && this.editor.setPosition(position);
        }
    }

    removeModel = (path: string) => {
        this.files[path]?.dispose();
        delete this.files[path];
    }
}

export const Monaco = new _Monaco()