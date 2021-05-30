import React, { useEffect, useRef } from 'react';
import * as monaco from 'monaco-editor';
import path from 'path';
import { Box } from './Code.styled';
import { useRaxy } from '../../store/store';
import { FS } from '../../services/FileSystem';
import { getFileType } from '../../utils/getFileType';
import { prettierText } from '../../utils/prettier';
export const Code = () => {

    const ref = useRef<HTMLDivElement>(null);
    const editor = useRef<monaco.editor.IStandaloneCodeEditor>();

    const { store: { fileSystem }, state: { currentFile } } = useRaxy(store => ({ currentFile: store.flags.workplace.currentFile }));

    useEffect(() => {

        if (ref.current && currentFile) {

            const language = getFileType(currentFile);

            console.log(path.resolve(currentFile.path, currentFile.name))
            const data = FS.readFileSync(path.resolve(currentFile.path, currentFile.name), 'utf-8');

            const formated = language === 'typescript' ? prettierText(data) : data;

            if (editor.current) {
                editor.current.setValue(formated);
                const model = editor.current.getModel();
                if (model)
                    monaco.editor.setModelLanguage(model, language);
            }
            else {

                monaco.languages.typescript.typescriptDefaults.setCompilerOptions({ jsx: monaco.languages.typescript.JsxEmit.React })

                editor.current = monaco.editor.create(ref.current, {
                    value: formated,
                    theme: "vs-dark",
                    language
                });

                editor.current.onDidChangeModelContent(e => console.log(e));
            }

        }
    }, [currentFile])

    return <Box ref={ref} />;

}