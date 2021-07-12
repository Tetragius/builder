import React, { useState } from 'react';
import { Button, FCCFile, FileLoaderButton, FormField, Groups, Input, Modal, Switcher, Tabs } from 'vienna-ui';
import { baseProjectInit } from '../presets/basicProjectPreset';
import { FS } from '../services';
import { useRaxy } from '../store/store';

export const CreateProject = ({ isOpen, onClose }) => {

    const { state: { simpleLoading, name }, store } = useRaxy(store => ({ simpleLoading: store.project.simpleLoading, name: store.project.name }));

    const [loading, setLoading] = useState(false);
    const [tabsValue, setTabsValue] = useState('createNew');
    const [files, setFiles] = useState<FCCFile[]>([]);

    const create = () => {
        setLoading(true);
        baseProjectInit(name, simpleLoading).then(() => {
            setLoading(false);
            onClose(false);
        });
    };

    const open = async () => {
        if (files[0]) {
            setLoading(true);
            const text = await files[0].text();
            const json = JSON.parse(text);
            store.meta = { ...store.meta, ...json.meta };
            store.project = json.project;
            FS.setVol(json.vol);
            setLoading(false);
            onClose(false);
        }
    };

    return <Modal isOpen={isOpen} closeIcon={false} onClose={() => false} >
        <Modal.Layout>
            <Modal.Head>
                <Modal.Title>Начало работы</Modal.Title>
            </Modal.Head>
            <Modal.Body style={{ width: '400px', height: '184px' }}>
                <Groups design="vertical">
                    <Groups>
                        <Tabs value={tabsValue} onChange={(e, value) => setTabsValue(value)}>
                            <Tabs.Tab value='createNew'>Создать новый</Tabs.Tab>
                            <Tabs.Tab value='openExists'>Открыть существующий</Tabs.Tab>
                        </Tabs>
                    </Groups>
                    {tabsValue === 'createNew' &&
                        <Groups design="vertical">
                            <FormField style={{ width: '100%' }}>
                                <FormField.Label required>Название проекта</FormField.Label>
                                <FormField.Content>
                                    <Input disabled={loading} placeholder={'название проекта'} defaultValue={name} onChange={(e, data) => store.project.name = data.value} />
                                </FormField.Content>
                            </FormField>
                            <FormField>
                                <FormField.Label>Дополнительные параметры</FormField.Label>
                                <FormField.Content>
                                    <Switcher disabled={loading} checked={simpleLoading} onChange={(e, data) => store.project.simpleLoading = data.value}>Использовать упрощенную загрузку (рекомендуется)</Switcher>
                                </FormField.Content>
                            </FormField>
                        </Groups>
                    }
                    {tabsValue === 'openExists' &&
                        <Groups design="vertical">
                            <FormField style={{ width: '100%' }}>
                                <FormField.Label required>Сохраненный проект</FormField.Label>
                                <FormField.Content>
                                    <FileLoaderButton onChange={(e, data) => setFiles(data)} accept='.json' multiple={false}>Выберите файл</FileLoaderButton>
                                </FormField.Content>
                                {files.length ? <FormField.Message>{files[0].name}</FormField.Message> : null}
                            </FormField>
                        </Groups>
                    }
                </Groups>
            </Modal.Body>
            <Modal.Footer>
                {tabsValue === 'createNew' && <Button design='accent' disabled={!name} onClick={create} loading={loading}>Создать</Button>}
                {tabsValue === 'openExists' && <Button design='accent' disabled={!files[0]?.name} onClick={open} loading={loading}>Открыть</Button>}
            </Modal.Footer>
        </Modal.Layout>
    </Modal>
}