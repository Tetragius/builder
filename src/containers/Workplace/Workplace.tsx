import PerfectScrollbar from 'perfect-scrollbar';
import React, { useEffect, useRef } from 'react';
import { Code, Frame } from '../../components';
import { ImageViewer } from '../../components/ImageViewer';
import { useRaxy } from '../../store/store';
import { getFileTypeByPath } from '../../utils/getFileType';
import { Box, Main } from './Workplace.styles';

export const Workplace = () => {

    const ref = useRef<any>();
    const refPS = useRef<any>();

    const { store, state: { flags: { currentScreenId, currentFilePath, viewAll }, isDirTree } } = useRaxy(store => (
        {
            flags: store.flags.workplace,
            length: store.project.structure.filter(element => element.namespace === 'layer').length,
            isDirTree: store.flags.leftBar.dirTree
        }));
    
    const screens =store.project.structure.filter(element => element.namespace === 'layer');
    const layer = screens?.find(layer => layer.id === currentScreenId);

    // const messageHandler = useCallback((e: any) => {
    //     console.log(e.data);
    // }, []);

    // useEffect(() => {

    //     window.addEventListener('message', messageHandler);

    //     return () => {
    //         window.removeEventListener('message', messageHandler);
    //     }
    // }, [])

    useEffect(() => {
        if (ref.current) {
            refPS.current = new PerfectScrollbar(ref.current);
        }
    }, [])

    useEffect(() => {
        refPS.current?.update();
    }, [viewAll])

    return (
        <Box>
            {!isDirTree &&
                <Main ref={ref} viewAll={viewAll} length={screens.length}>
                    {viewAll
                        ?
                        screens.map(layer => <Frame
                            id={layer.id}
                            key={layer.id}
                            item={layer}
                            onClick={() => store.flags.workplace.currentScreenId = layer.id}
                            onDoubleClick={() => store.flags.workplace.viewAll = false}
                        />)
                        : layer ? <Frame key={layer.id} id={layer.id} item={layer} /> : null}
                </Main>
            }
            {isDirTree && getFileTypeByPath(currentFilePath) !== 'image' && <Main><Code /></Main>}
            {isDirTree && getFileTypeByPath(currentFilePath) === 'image' && <Main><ImageViewer /></Main>}
        </Box>
    )
}