import React, { useEffect, useRef } from 'react';
import * as monaco from 'monaco-editor';
import { Box } from './Code.styled';
import { useRaxy } from '../../store/store';
import { readFileSync } from '../../services';
import { reconstructPath } from '../../utils/reconstructPath';
import { getFileType } from '../../utils/getFileType';
import { prettierText } from '../../utils/prettier';

export const Code = () => {

    const ref = useRef<HTMLDivElement>(null);
    const editor = useRef<monaco.editor.IStandaloneCodeEditor>();

    const { store: { fileSystem }, state: { currentFileId } } = useRaxy(store => ({ currentFileId: store.flags.workplace.currentFileId }));

    useEffect(() => {
        if (ref.current) {

            const file = fileSystem.find(file => file.id === currentFileId);

            const language = getFileType(file);
            
            const data = readFileSync(reconstructPath(file, fileSystem), 'utf-8');

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
            }

        }
    }, [currentFileId])

    return <Box ref={ref} />;

}