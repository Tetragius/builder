import PerfectScrollbar from 'perfect-scrollbar';
import React, { useEffect, useRef } from 'react';
import { Code, Frame } from '../../components';
import { useRaxy } from '../../store/store';
import { Box, Main, Status } from './Workplace.styles';

export const Workplace = () => {

    const ref = useRef<any>();
    const refPS = useRef<any>();

    const { store, state: { flags: { currentScreenId, viewAll }, screens, isDirTree } } = useRaxy(store => (
        {
            flags: store.flags.workplace,
            screens: store.project.structure.filter(element => element.type === 'screen'),
            isDirTree: store.flags.leftBar.dirTree
        }));

    const screen = screens?.find(screen => screen.id === currentScreenId);

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
                        screens.map(screen => <Frame
                            id={screen.id}
                            key={screen.id}
                            item={screen}
                            onClick={() => store.flags.workplace.currentScreenId = screen.id}
                            onDoubleClick={() => store.flags.workplace.viewAll = false}
                        />)
                        : screen ? <Frame key={screen.id} id={screen.id} item={screen} /> : null}
                </Main>
            }
            {isDirTree && <Main><Code /></Main>}
            <Status />
        </Box>
    )
}