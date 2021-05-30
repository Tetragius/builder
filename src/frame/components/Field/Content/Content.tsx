import { useRaxy } from '@tetragius/raxy-react';
import React from 'react';
import { Wrapper } from '../..';
import { IStore } from '../../../../interfaces';
import { DnDHOC } from '../../../../services/DnD';
import { styleFormatter } from '../../../../utils/styleFormatter';
import { Box } from './Content.styles';

export const _Content = ({ onDragStart, onDragEnd, onDragOver, onDrop }: any) => {

    const { state: { structure, styled, style } } = useRaxy<IStore>(store => ({
        styled: store.project.structure.find(item => item.id === window.frameElement?.id)?.styled,
        style: store.project.structure.find(item => item.id === window.frameElement?.id)?.style,
        structure: store.project.structure,
        length: store.project.structure.length
    }), { structure: { ignoreTimeStamp: true } })

    return (
        <Box
            onDragStart={onDragStart}
            onDragOver={onDragOver}
            onDragEnd={onDragEnd}
            onDrop={onDrop}
            style={styled ? styleFormatter(style)[0] : {}}
        >
            {structure?.filter(s => s.parentId == window.frameElement?.id).map(item => (
                <Wrapper key={item.id} item={item} />
            ))}
        </Box>
    )
}

export const Content = DnDHOC('CONTENT', _Content);