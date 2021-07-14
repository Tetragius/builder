import { useRaxy } from '@tetragius/raxy-react';
import React, { useMemo } from 'react';
import { WrapperFactory } from '../..';
import { IStore } from '../../../../interfaces';
import { DnDHOC } from '../../../../services/DnD';
import { styleFormatter } from '../../../../utils/styleFormatter';
import { Box } from './Content.styles';

export const _Content = ({ onDragStart, onDragEnd, onDragOver, onDrop, id }: any) => {

    const { state: { structure, styled, style, length } } = useRaxy<IStore>(store => ({
        styled: store.project.structure.find(item => item.id === id)?.styled,
        style: store.project.structure.find(item => item.id === id)?.style,
        structure: store.project.structure,
        length: store.project.structure.length
    }), { structure: { ignoreTimeStamp: true } })

    const children = useMemo(() => structure?.filter(s => s.parentId == id).map(item => {
        const Wrapper = WrapperFactory(item);
        return <Wrapper key={item.id} item={item} />;
    }), [length, structure])

    return (
        <Box
            onDragStart={onDragStart}
            onDragOver={onDragOver}
            onDragEnd={onDragEnd}
            onDrop={onDrop}
            style={styled ? styleFormatter(style)[0] : {}}
        >
            {children}
        </Box>
    )
}

export const Content = DnDHOC('CONTENT', _Content);