import React, { useEffect, useRef } from 'react';
import * as monaco from 'monaco-editor';
import path from 'path';
import { Box } from './Code.styled';
import { useRaxy } from '../../store/store';
import { readFileSync } from '../../services';
import { getFileType } from '../../utils/getFileType';
import { prettierText } from '../../utils/prettier';
import { IFile } from '../../interfaces';

export const Code = () => {

    const ref = useRef<HTMLDivElement>(null);
    const editor = useRef<monaco.editor.IStandaloneCodeEditor>();

    const { store: { fileSystem }, state: { currentFileId } } = useRaxy(store => ({ currentFileId: store.flags.workplace.currentFileId }));

    useEffect(() => {

        const file = fileSystem.find(file => file.id === currentFileId) as IFile;
        if (ref.current && file) {

            const language = getFileType(file);

            const data = readFileSync(path.resolve(file.path, file.name), 'utf-8');

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
    }, [currentFileId])

    return <Box ref={ref} />;

}