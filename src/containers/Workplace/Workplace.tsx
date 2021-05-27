import PerfectScrollbar from 'perfect-scrollbar';
import React, { useEffect, useRef } from 'react';
import { Code, Frame } from '../../components';
import { useRaxy } from '../../store/store';
import { Box, Main } from './Workplace.styles';

export const Workplace = () => {

    const ref = useRef<any>();
    const refPS = useRef<any>();

    const { store, state: { flags: { currentScreenId, viewAll }, screens, isDirTree } } = useRaxy(store => (
        {
            flags: store.flags.workplace,
            screens: store.project.structure.filter(element => element.namespace === 'layer'),
            isDirTree: store.flags.leftBar.dirTree
        }));

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
            {isDirTree && <Main><Code /></Main>}
        </Box>
    )
}