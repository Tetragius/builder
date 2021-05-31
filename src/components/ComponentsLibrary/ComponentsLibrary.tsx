import React from 'react';
import { Button } from 'vienna-ui';
import * as Icons from '../../builtin-icons';
import { DnDHOC } from '../../services/DnD';
import { useRaxy } from '../../store/store';
import { sortMetaArray } from '../../utils/sortDirArrayByName';
import { Box, Block, BlockName } from './ComponentsLibrary.styles';

export const ComponentsLibrary = () => {

    const { store: { meta } } = useRaxy();
    const entries = Object.entries(meta);

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

    const separate = entries.reduce((result, entry) => {
        const [key, meta] = entry;
        const namespace = meta.namespace;
        if (!result[namespace]) {
            result[namespace] = {};
        }
        result[namespace][key] = meta;
        return result;
    }, {});

    const keys = Object.keys(separate);

    return <Box>
        {keys.sort(sortMetaArray).map(key => {
            const subList = separate[key];
            const subListKeys = Object.keys(subList);
            return (
                <Block key={key}>
                    <BlockName>{key}</BlockName>
                    {subListKeys.sort(sortMetaArray).map(subKey => <DnDButton key={subKey} name={subKey} item={subList[subKey]} />)}
                </Block>
            )
        })}
    </Box>
}