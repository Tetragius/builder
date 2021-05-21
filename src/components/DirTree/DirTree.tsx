import React, { useCallback } from 'react';
import { Button } from 'vienna-ui';
import { Download } from 'vienna.icons';
import { DnDHOC } from '../../services';
import { useRaxy } from '../../store/store';
import { sortDirArrayByName } from '../../utils/sortDirArrayByName';
import { sortDirArrayByType } from '../../utils/sortDirArrayByType';
import { Box, Dir, Icon, Name, Menu } from './DirTree.styles';
import { ClosedFolderIcon } from './Icons/closed';
import { FileIcon } from './Icons/file';
import { OpenFolderIcon } from './Icons/open';
import { zip } from '../../utils/zip';
import { downlload } from '../../utils/donload';

export const _DirTree = ({ item, onDragStart, onDragEnd, onDragOver, onDrop }: any) => {

    const { name, isFolder, isOpen } = item;
    const { store, state: { fileSystem } } = useRaxy(store => (
        {
            fileSystem: store?.fileSystem,
        }));

    const children = store.fileSystem.reduce((o: any, i: any) => {
        if (i.parentId === item.id) {
            o.push(i);
        }
        return o;
    }, [])
        .sort(sortDirArrayByName)
        .sort(sortDirArrayByType);

    const clickHandler = () => {
        if (item.isFolder) {
            item.isOpen = !isOpen
        }
        else {
            store.flags.workplace.currentFileId = item.id;
        }
    }

    const downloadProject = useCallback(async () => {
        const buf = await zip(fileSystem);
        downlload(buf, "poject.zip", 'application/zip');
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
            <Dir onClick={clickHandler} tabIndex={1}>
                <Icon>{isFolder ? isOpen ? <OpenFolderIcon /> : <ClosedFolderIcon /> : <FileIcon />}</Icon>
                <Name>{name ?? 'PROJECT'}</Name>
                {!item.parentId &&
                    <Menu>
                        <Button onClick={downloadProject} design={'ghost'} size={'s'}><Download size={'s'} /></Button>
                    </Menu>
                }
            </Dir>
            {
                item.isOpen && children?.map((item: any, idx: number) => <DirTree key={idx} item={item} />)
            }
        </Box>
    )
}

export const DirTree = DnDHOC('DIR_TREE', _DirTree);