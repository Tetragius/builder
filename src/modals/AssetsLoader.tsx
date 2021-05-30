import React, { useEffect, useRef, useState } from 'react';
import { Button, FCCFile, FileLoader, Groups, Modal } from 'vienna-ui';
import { FS } from '../services';
import { uniqueId } from '../services/Core';
import { store } from '../store/store';
import { blobToDataURL } from '../utils/blobToDataUrl';
import { Preview } from './Preview';

const arrayBufferToBase64 = (buffer) => {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
}

export const AssetsLoader = ({ isOpen, onClose }) => {

    const [files, setFiles] = useState<FCCFile[]>([]);
    const [previewUrl, setPreviwUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const ref = useRef<HTMLInputElement>();

    useEffect(() => {
        setFiles([]);
    }, [isOpen])

    const loadFiles = async () => {
        setLoading(true);

        if (!FS.existsSync(`${store.project.name}/assets`)) {
            FS.mkdirSyncReq(`${store.project.name}/assets`);
            store.fileSystem.push({
                id: uniqueId(),
                path: `/${store.project.name}`,
                name: 'assets',
                editable: false,
                isFolder: true,
                isOpen: false,
                type: 'folder'
            })
        }

        await Promise.all(files.map(async file => {
            const blob = await (await fetch(file.url ?? '')).blob();
            const dataUrl = await blobToDataURL(blob);
            FS.writeFileSync(`${store.project.name}/assets/${file.name ?? ''}`, dataUrl);
            store.fileSystem.push({
                id: uniqueId(),
                path: `/${store.project.name}/assets`,
                name: file.name ?? '',
                editable: false,
                isFolder: false,
                isOpen: false,
                type: 'image'
            })
        }));
        setLoading(false);
        onClose(false);
    }

    const removefile = (file: FCCFile) => {
        setFiles(files.filter(f => f !== file));
    }

    const preview = (file: FCCFile) => {
        setPreviwUrl(file.url ?? '');
    }

    const content = (
        <>
            <div>Перетащите файлы или нажмите</div>
            <Button onClick={() => ref.current?.click()} design="ghost" disabled={loading}>Загрузить</Button>
        </>
    )

    return (
        <>
            <Modal isOpen={isOpen} closeIcon={false} onClose={() => loading ? false : onClose(false)} >
                <Modal.Layout>
                    <Modal.Head>
                        <Modal.Title>Загрузка дополнительных файлов</Modal.Title>
                        <div style={{ width: '100%' }}>
                            <FileLoader
                                ref={ref}
                                content={content}
                                subContent=".png, .jpg, .jpeg, .svg"
                                accept=".png, .jpg, .svg"
                                multiple
                                onChange={(e, files) => setFiles(files)} />
                        </div>
                    </Modal.Head>
                    <Modal.Body maxHeight={400}>
                        <Groups design="vertical">
                            {files.map(file => (
                                <FileLoader.File key={file.url} file={file} onClick={preview} onDelete={removefile} />
                            ))}
                        </Groups>
                    </Modal.Body>
                    <Modal.Footer>
                        <Groups justifyContent="flex-end">
                            <Button disabled={!files.length} onClick={loadFiles} design="accent" loading={loading}>Сохранить</Button>
                        </Groups>
                    </Modal.Footer>
                </Modal.Layout>
            </Modal >
            <Preview url={previewUrl} isOpen={!!previewUrl} onClose={setPreviwUrl} />
        </>
    )
}