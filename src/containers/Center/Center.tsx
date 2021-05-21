import React from 'react';
import { LeftBar, RightBar, Workplace } from '..';
import { Box } from './Center.styles';

export const Center = () => {
    return (
        <Box>
            <LeftBar />
            <Workplace />
            <RightBar />
        </Box>
    );
}