import React, { useState } from 'react';
import { Button, FormField, Groups, Input, Modal, Switcher } from 'vienna-ui';
import { baseProjectInit } from '../presets/basicProjectPreset';
import { useRaxy } from '../store/store';

export const CreateProject = ({ isOpen, onClose }) => {

    const { state: { simpleLoading, name }, store } = useRaxy(store => ({ simpleLoading: store.project.simpleLoading, name: store.project.name }));

    const [loading, setLoading] = useState(false);

    const close = () => {
        setLoading(true);
        baseProjectInit(name, simpleLoading).then(() => {
            setLoading(false);
            onClose(false);
        });
    };

    return <Modal isOpen={isOpen} closeIcon={false} onClose={() => false} >
        <Modal.Layout>
            <Modal.Head>
                <Modal.Title>Введите название проекта</Modal.Title>
            </Modal.Head>
            <Modal.Body>
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
            </Modal.Body>
            <Modal.Footer>
                <Button design='accent' disabled={!name} onClick={close} loading={loading}>Создать</Button>
            </Modal.Footer>
        </Modal.Layout>
    </Modal>
}