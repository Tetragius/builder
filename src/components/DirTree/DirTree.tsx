import React, { useCallback, useState } from 'react';
import { Button } from 'vienna-ui';
import { Download, Upload } from 'vienna.icons';
import { DnDHOC } from '../../services/DnD';
import { useRaxy } from '../../store/store';
import { Box, Dir, Icon, Name, Menu } from './DirTree.styles';
import { ClosedFolderIcon } from './Icons/closed';
import { FileIcon } from './Icons/file';
import { OpenFolderIcon } from './Icons/open';
import { zip } from '../../utils/zip';
import { downlload } from '../../utils/donload';
import { ZipStatus } from '../../modals/ZipStatus';
import { AssetsLoader } from '../../modals/AssetsLoader';
import { FS } from '../../services';

const name = (path: string) => path.split('/').pop();

export const _DirTree = ({ path, onDragStart, onDragEnd, onDragOver, onDrop }: any) => {

    const { store, state: { projectName, isOpen } } = useRaxy(store => (
        {
            isOpen: store.flags.workplace.openFolders[path],
            projectName: store?.project.name
        }));

    const [progress, setProgress] = useState(false);
    const [uploadModal, setUploadModal] = useState(false);

    const children = FS.getPathsFromFolder(path);

    const clickHandler = useCallback(() => {
        if (FS.isDirectory(path)) {
            store.flags.workplace.openFolders[path] = !store.flags.workplace.openFolders[path];
        }
        else {
            store.flags.workplace.currentFilePath = path;
        }
    }, [])

    const downloadProject = useCallback(async () => {
        setProgress(true);
        const buf = await zip(projectName);
        setProgress(false);
        downlload(buf, `${projectName}.zip`, 'application/zip');
    }, [])

    return (
        <Box
            title={name(path)}
            draggable
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
            onDragOver={onDragOver}
            onDrop={onDrop}
        >
            <Dir onClick={clickHandler} tabIndex={1}>
                <Icon>{FS.isDirectory(path) ? isOpen ? <OpenFolderIcon /> : <ClosedFolderIcon /> : <FileIcon />}</Icon>
                <Name>{name(path) ?? 'PROJECT'}</Name>
                {!path &&
                    <Menu>
                        <Button onClick={() => setUploadModal(true)} design={'ghost'} size={'s'}><Upload size={'s'} /></Button>
                        <Button onClick={downloadProject} design={'ghost'} size={'s'}><Download size={'s'} /></Button>
                    </Menu>
                }
            </Dir>
            {
                isOpen && children?.map((path: any, idx: number) => <DirTree key={idx} path={path} />)
            }
            <ZipStatus isOpen={progress} />
            <AssetsLoader isOpen={uploadModal} onClose={setUploadModal} />
        </Box>
    )
}

export const DirTree = DnDHOC('DIR_TREE', _DirTree);
