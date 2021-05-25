import React, { useState } from 'react';
import { Button, Input, Modal } from 'vienna-ui';

export const CreateContainer = () => {

    const [value, setValue] = useState('MyProject');

    return <Modal isOpen={true} closeIcon={false} >
        <Modal.Layout>
            <Modal.Head>
                <Modal.Title>Введите название контейнера</Modal.Title>
            </Modal.Head>
            <Modal.Body>
                <Input value={value} onChange={(e, data) => setValue(data.value)} />
            </Modal.Body>
            <Modal.Footer>
                <Button design='accent' disabled={!value}>Создать</Button>
            </Modal.Footer>
        </Modal.Layout>
    </Modal>
}