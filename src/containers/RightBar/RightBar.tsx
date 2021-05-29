import PerfectScrollbar from 'perfect-scrollbar';
import React, { useCallback, useEffect, useRef } from 'react';
import { Tabs, ThemeProvider } from 'vienna-ui';
import { Picture1, Literature } from 'vienna.icons';
import { PropsEditor, StateEditor } from '../../components';
import { IComponent } from '../../interfaces';
import { useRaxy } from '../../store/store';
import { Box, Head, Content } from './RightBar.styles';

export const RightBar = () => {

    const ref = useRef<any>();
    const refPS = useRef<any>();

    const { state: { flags, namespace } } = useRaxy(store => (
        {
            flags: store.flags.rightBar,
            namespace: (store.project.selected as IComponent)?.namespace
        }));


    const { propsEditor, stateEditor } = flags;

    useEffect(() => {
        if (ref.current) {
            refPS.current = new PerfectScrollbar(ref.current, {
                wheelPropagation: true,
            });
        }
    }, [])

    useEffect(() => {
        refPS.current?.update();
    }, [Object.values(flags)])

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

    return <Box>
        <Head>
            <ThemeProvider theme={{ tabs: { custom: { width: 'auto' } } }}>
                {namespace &&
                    <Tabs design="primary" size={'s'} value={Object.keys(flags).find(flag => flags[flag])} onChange={barToggle}>
                        {namespace && <Tabs.Tab value={'propsEditor'}><Literature size={'s'} /></Tabs.Tab>}
                        {(namespace === 'native' || namespace === 'layer') && <Tabs.Tab value={'stateEditor'}><Picture1 size={'s'} /></Tabs.Tab>}
                    </Tabs>
                }
            </ThemeProvider>
        </Head>
        <Content ref={ref}>
            {namespace && propsEditor && <PropsEditor />}
            {(namespace === 'native' || namespace === 'layer') && stateEditor && <StateEditor />}
        </Content>
    </Box>
}