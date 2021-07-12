import React, { useEffect, useRef } from 'react';
import { Box } from './Code.styled';
import { useRaxy } from '../../store/store';
import { Monaco } from '../../services/Monaco';
import { FS } from '../../services';

export const Code = () => {

    const ref = useRef<HTMLDivElement>(null);
    const editor = useRef<monaco.editor.IStandaloneCodeEditor>();

    const { state: { currentFilePath } } = useRaxy(store => ({ currentFilePath: store.flags.workplace.currentFilePath }));

    useEffect(() => {

        if (ref.current && currentFilePath && FS.isFile(currentFilePath)) {

            if (editor.current) {

                editor.current.setModel(Monaco.createModel(currentFilePath));
            }
            else {

                editor.current = Monaco.createEditor(ref.current, Monaco.createModel(currentFilePath));
                // editor.current.onDidChangeModelContent(e => console.log(e));
            }

        }
    }, [currentFilePath])

    return <Box ref={ref} />;

}