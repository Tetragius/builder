import { Raxy } from '@tetragius/raxy-react';
import React from 'react';
import { Body } from "vienna-ui";
import { DnDHOC } from '../../services/DnD';
import { instanse } from '../../store/store';
import { Center } from '../Center';
import { Global, Box } from './App.styles';

const _App = ({ onDragEnter }: any) => {
    return (
        <Raxy value={instanse}>
            <Body>
                <Box onDragEnter={onDragEnter}>
                    <Global />
                    <Center />
                </Box>
            </Body>
        </Raxy>
    );
}

export const App = DnDHOC('APPLICATION', _App)
