import { useRaxy } from '@tetragius/raxy-react';
import React, { useEffect } from 'react';
import { Wrapper } from '../..';
import { DnDHOC } from '../../../../services';
import { Box } from './Content.styles';

export const _Content = ({ onDragStart, onDragEnd, onDragOver, onDrop }: any) => {

    const { state: { structure } } = useRaxy(store => ({
        structure: store.project.structure,
        length: store.project.structure.length
    }), { structure: { ignoreTimeStamp: true } })

    return (
        <Box
            onDragStart={onDragStart}
            onDragOver={onDragOver}
            onDragEnd={onDragEnd}
            onDrop={onDrop}
        >
            {structure?.filter(s => s.parentId == window.frameElement?.id).map(item => (
                <Wrapper key={item.id} itemId={item.id} />
            ))}
        </Box>
    )
}

export const Content = DnDHOC('CONTENT', _Content);