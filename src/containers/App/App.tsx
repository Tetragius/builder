import { Raxy } from '@tetragius/raxy-react';
import React from 'react';
import { Body } from "vienna-ui";
import { Head } from '..';
import { DnDHOC } from '../../services';
import { instanse } from '../../store/store';
import { Center } from '../Center';
import { Global, Box } from './App.styles';

const _App = ({ onDragEnter }: any) => {
    return (
        <Raxy value={instanse}>
            <Body>
                <Box onDragEnter={onDragEnter}>
                    <Global />
                    <Head />
                    <Center />
                </Box>
            </Body>
        </Raxy>
    );
}

export const App = DnDHOC('APPLICATION', _App)
