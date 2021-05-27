import React, { useCallback, useState } from 'react';
import { Button, FormField, Groups, Input, Modal, Radio } from 'vienna-ui';
import { IInstanseType } from '../interfaces/IINstanseType';
import { createEmptyLayer } from '../presets/basicProjectPreset';
import { capitalizeString } from '../utils/capitalizeString';

export const CreateLayer = ({ onClose, isOpen }) => {

    const [name, setName] = useState(``);
    const [type, setType] = useState<IInstanseType>('container');

    const addLayer = useCallback(() => {

        if (name) {
            createEmptyLayer(name, type);
            setName('');
        }

        onClose();

    }, [name, type])

    return <Modal isOpen={isOpen} closeIcon={false} onClose={onClose} >
        <Modal.Layout>
            <Modal.Head>
                <Modal.Title>Введите название слоя</Modal.Title>
            </Modal.Head>
            <Modal.Body>
                <Groups design="vertical">
                    <FormField style={{ width: '100%' }}>
                        <FormField.Label required>Название слоя</FormField.Label>
                        <FormField.Content>
                            <Input placeholder={'название слоя'} value={name} onChange={(e, data) => setName(capitalizeString(data.value))} />
                        </FormField.Content>
                    </FormField>
                    <FormField>
                        <FormField.Label>Тип слоя</FormField.Label>
                        <FormField.Content>
                            <Groups design='horizontal'>
                                <Radio name="type" value={'container'} checked={type === "container"} onChange={(e, data) => setType(data.value)}>Контейнер</Radio>
                                <Radio name="type" value={'component'} checked={type === "component"} onChange={(e, data) => setType(data.value)}>Компонент</Radio>
                            </Groups>
                        </FormField.Content>
                    </FormField>
                </Groups>
            </Modal.Body>
            <Modal.Footer>
                <Button design='accent' disabled={!name && name.includes(' ')} onClick={addLayer}>Создать</Button>
            </Modal.Footer>
        </Modal.Layout>
    </Modal>
}