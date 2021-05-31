import React, { useEffect, useRef } from 'react';
import { Box } from './Code.styled';
import { useRaxy } from '../../store/store';
import { Monaco } from '../../services/Monaco';

export const Code = () => {

    const ref = useRef<HTMLDivElement>(null);
    const editor = useRef<monaco.editor.IStandaloneCodeEditor>();

    const { state: { currentFile } } = useRaxy(store => ({ currentFile: store.flags.workplace.currentFile }));

    useEffect(() => {

        if (ref.current && currentFile) {

            if (editor.current && currentFile.model) {
                editor.current.setModel(currentFile.model);
            }
            else {

                editor.current = Monaco.createEditor(ref.current, currentFile?.model);
                // editor.current.onDidChangeModelContent(e => console.log(e));
            }

        }
    }, [currentFile])

    return <Box ref={ref} />;

}