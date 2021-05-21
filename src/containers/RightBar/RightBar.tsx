import PerfectScrollbar from 'perfect-scrollbar';
import React, { useCallback, useEffect, useRef } from 'react';
import { Button } from 'vienna-ui';
import { GoRight } from 'vienna.icons';
import { PropsEditor } from '../../components';
import { Box, Head, Content, Menu } from './RightBar.styles';

export const RightBar = () => {

    const ref = useRef<any>();
    const refPS = useRef<any>();

    useEffect(() => {
        if (ref.current) {
            refPS.current = new PerfectScrollbar(ref.current);
        }
    }, [])

    useEffect(() => {
        refPS.current?.update();
    }, [])

    const play = useCallback(() => {
        window.open('/playground/index.html', '_blank');
    }, [])

    return <Box>
        <Content ref={ref}>
            <Menu>
                <Button onClick={play} design={'ghost'} size={'s'}><GoRight size={'s'} color="green" /></Button>
            </Menu>
            <PropsEditor />
        </Content>
    </Box>
}