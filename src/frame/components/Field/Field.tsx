import { Raxy } from '@tetragius/raxy-react';
import React from 'react';
import { Body } from 'vienna-ui';
import { instanse } from '../../../store/store';
import { Content } from './Content';
import { Box, Global } from './Field.styles';

export const Field = () => {

    // useEffect(() => {
    //     window.parent.postMessage('init', '*');
    // }, []);

    return <Raxy value={instanse}>
        <Body>
            <Box>
                <Global />
                <Content id={window.frameElement?.id} />
            </Box>
        </Body>
    </Raxy>

}