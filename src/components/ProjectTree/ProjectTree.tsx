import React, { useCallback } from 'react';
import { Button } from 'vienna-ui';
import { CardAddNew } from 'vienna.icons';
import { RightSmall, DownSmall } from 'vienna.icons';
import * as Icons from '../../builtin-icons';
import { Body, Textarea } from '../../builtin-icons';
import { DnDHOC } from '../../services';
import { useRaxy } from '../../store/store';
import { Box, Struct, Icon, Name, Menu } from './ProjectTree.styles';
import { uniqueId } from '../../frame/services';

const getIcon = (type: string, iconName?: any) => {
    if (type === 'root') {
        return <Textarea />
    }
    if (type === 'screen') {
        return <Body />
    }

    const Icon = Icons[iconName] ?? null;
    return Icon ? <Icon /> : null;
}

export const _ProjectTree = ({ item, onDragStart, onDragEnd, onDragOver, onDrop }: any) => {

    const { name, isOpen } = item;
    const { store, state: { selected, projectStructure, name: projectName } } = useRaxy(store => ({
        name: store.project.name,
        selected: store.project.selected === item,
        projectStructure: store.project.structure,
    }));

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
        if (item.type === 'screen') {
            store.flags.workplace.currentScreenId = item.id;
            store.flags.workplace.viewAll = false;
        }
        if (item.type === 'root') {
            store.flags.workplace.viewAll = true;
        }
    }, [])

    const addContainer = useCallback(() => {
        const id = uniqueId();
        const name = prompt('Название компонента', `Container_${id}`);

        if (name) {
            const root = projectStructure.find(item => !item.parentId);
            projectStructure.push({
                id,
                toolIcon: 'Body',
                parentId: root?.id,
                name,
                namespace: 'screen',
                isOpen: false
            });

            store.meta[name] = {
                namespace: 'custom',
                toolIcon: 'Body',
                allowChildren: null,
                resizable: 'none',
                nowrapChildren: true,
                nowrap: false,
            };

            store.fileSystem.push({ id: uniqueId(), name: `${name}`, isFolder: true, path: `/${projectName}/src/containers`, editable: false, isOpen: false });
            store.fileSystem.push({ id: uniqueId(), name: `${name}.tsx`, isFolder: false, path: `/${projectName}/src/containers/${name}`, editable: false, isOpen: false });
            store.fileSystem.push({ id: uniqueId(), name: `${name}.styled.tsx`, isFolder: false, path: `/${projectName}/src/containers/${name}`, editable: false, isOpen: false });
            store.fileSystem.push({ id: uniqueId(), name: 'index.ts', isFolder: false, path: `/${projectName}/src/containers/${name}`, editable: false, isOpen: false });
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
                        <Button onClick={addContainer} design={'ghost'} size={'s'}><CardAddNew size={'s'} /></Button>
                    </Menu>
                }
            </Struct>
            {
                item.isOpen && children?.map((item: any) => <ProjectTree key={item.id} item={item} />)
            }
        </Box>
    )
}

export const ProjectTree = DnDHOC('PROJECT_TREE', _ProjectTree);