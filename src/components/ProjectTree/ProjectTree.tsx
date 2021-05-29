import React, { useCallback, useState } from 'react';
import { Button } from 'vienna-ui';
import { CardAddNew } from 'vienna.icons';
import { RightSmall, DownSmall } from 'vienna.icons';
import * as Icons from '../../builtin-icons';
import { Body, Textarea } from '../../builtin-icons';
import { IComponent } from '../../interfaces';
import { CreateLayer } from '../../modals/CreateLayer';
import { DnDHOC } from '../../services/DnD';
import { useRaxy } from '../../store/store';
import { Box, Struct, Icon, Name, Menu } from './ProjectTree.styles';

const getIcon = (type: string, iconName?: any) => {
    if (type === 'root') {
        return <Textarea />
    }
    if (type === 'layer') {
        return <Body />
    }

    const Icon = Icons[iconName] ?? null;
    return Icon ? <Icon /> : null;
}

export const _ProjectTree = ({ item, onDragStart, onDragEnd, onDragOver, onDrop }: any) => {

    const { name, isOpen, namespace } = item as IComponent;
    const { store, state: { selected } } = useRaxy(store => ({
        selected: store.project.selected === item,
        ioOpen: item.isOpen
    }));

    const [modalIsOpen, setModalIsOpen] = useState(false);

    const children = store.project.structure.filter(i => {
        return i.parentId === item.id;
    });

    const clickHandlerIcon = useCallback((e) => {
        e.stopPropagation();
        if (!!children.length) {
            item.isOpen = !isOpen;
        }
    }, [isOpen])

    const clickHandler = useCallback((e) => {
        e.stopPropagation();
        store.project.selected = item;
        if (namespace === 'layer') {
            store.flags.workplace.currentScreenId = item.id;
            store.flags.workplace.viewAll = false;
        }
        if (namespace === 'root') {
            store.flags.workplace.viewAll = true;
        }
    }, [])



    return (
        <Box
            title={name}
            draggable
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
            onDragOver={onDragOver}
            onDrop={onDrop}
        >
            <Struct selected={selected} onClick={clickHandler}>
                <Icon onClick={clickHandlerIcon}>{isOpen ? <DownSmall size="s" /> : <RightSmall size="s" />}</Icon>
                <Icon>{getIcon(item.type, item?.toolIcon)}</Icon>
                <Name>{name}</Name>
                {!item.parentId &&
                    <Menu>
                        <Button onClick={() => setModalIsOpen(true)} design={'ghost'} size={'s'}><CardAddNew size={'s'} /></Button>
                    </Menu>
                }
            </Struct>
            {
                item.isOpen && children?.map((item: any) => <ProjectTree key={item.id} item={item} />)
            }
            <CreateLayer isOpen={modalIsOpen} onClose={() => setModalIsOpen(false)}></CreateLayer>
        </Box>
    )
}

export const ProjectTree = DnDHOC('PROJECT_TREE', _ProjectTree);