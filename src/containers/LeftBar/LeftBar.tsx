import React, { useCallback, useEffect, useRef } from 'react';
import { Folder, Grid, Cards } from 'vienna.icons';
import { Tabs, ThemeProvider } from 'vienna-ui';
import { ComponentsLibrary, DirTree, ProjectTree } from '../../components';
import { useRaxy } from '../../store/store';
import { Box, Head, Content } from './LeftBar.styles';
import PerfectScrollbar from 'perfect-scrollbar';

export const LeftBar = () => {

    const ref = useRef<any>();
    const refPS = useRef<any>();

    const { state: { fileSystem, flags, projectStructure } } = useRaxy(store => (
        {
            fileSystem: store?.fileSystem,
            projectStructure: store.project.structure,
            flags: store.flags.leftBar
        }));

    const { dirTree, projectTree, componentsLibrary } = flags;

    const barToggle = useCallback((e, value) => {
        for (const flag in flags) {
            if (flag === value) {
                flags[flag] = true;
            }
            else {
                flags[flag] = false;
            }
        }
    }, []);

    useEffect(() => {
        if (ref.current) {
            refPS.current = new PerfectScrollbar(ref.current);
        }
    }, [])

    useEffect(() => {
        refPS.current?.update();
    }, [Object.values(flags)])

    return (
        <Box>
            <Head>
                <ThemeProvider theme={{ tabs: { custom: { width: 'auto' } } }}>
                    <Tabs design="primary" size={'s'} value={Object.keys(flags).find(flag => flags[flag])} onChange={barToggle}>
                        <Tabs.Tab value={'dirTree'}><Folder size={'s'} /></Tabs.Tab>
                        <Tabs.Tab value={'projectTree'}><Grid size={'s'} /></Tabs.Tab>
                        <Tabs.Tab value={'componentsLibrary'}><Cards size={'s'} /></Tabs.Tab>
                    </Tabs>
                </ThemeProvider>
            </Head>
            <Content ref={ref}>
                {dirTree && <DirTree item={fileSystem.find(item => item.path === '')} />}
                {projectTree && <ProjectTree item={projectStructure.find(item => !item.parentId)} />}
                {componentsLibrary && <ComponentsLibrary />}
            </Content>
        </Box >
    )
}