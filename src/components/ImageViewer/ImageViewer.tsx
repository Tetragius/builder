import React from 'react';
import { FS } from '../../services';
import { useRaxy } from '../../store/store';
import { Box } from './ImageViewer.styles';

export const ImageViewer = () => {

    const { state: { image } } = useRaxy(store => ({ image: store.flags.workplace.currentFile }))



    return (
        <Box url={FS.readFileSync(`${image?.path}/${image?.name}`)}></Box>
    )
}