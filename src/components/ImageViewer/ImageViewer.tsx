import React from 'react';
import { FS } from '../../services';
import { useRaxy } from '../../store/store';
import { Box } from './ImageViewer.styles';

export const ImageViewer = () => {

    const { state: { imagePath } } = useRaxy(store => ({ imagePath: store.flags.workplace.currentFilePath }))



    return (
        <Box url={FS.readFileSync(imagePath)}></Box>
    )
}