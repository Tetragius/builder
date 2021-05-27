import React from 'react';
import { Button } from 'vienna-ui';
import * as Icons from '../../builtin-icons';
import { DnDHOC } from '../../services/DnD';
import { useRaxy } from '../../store/store';
import { Box, Break } from './ComponentsLibrary.styles';

export const ComponentsLibrary = () => {

    const { store: { meta } } = useRaxy();
    const keys = Object.keys(meta);

    const DnDButton = DnDHOC('COMPONENT', ({ name, item, onDragStart, onDragEnd, onDragOver, onDrop }: any) => {
        const Icon = Icons[item.toolIcon];
        return <Button
            draggable
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
            onDragOver={onDragOver}
            onDrop={onDrop}
            design="ghost">
            <Icon /><span>{name}</span>
        </Button>
    });

    return <Box>
        {keys.map(key => {
            if (key.startsWith('break')) {
                return <Break key={key} />;
            }
            return <DnDButton key={key} name={key} item={meta[key]} />
        })}
    </Box>
}