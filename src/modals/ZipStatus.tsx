import React from 'react';
import { Groups, Modal, Spinner } from 'vienna-ui';

export const ZipStatus = ({ isOpen }) => {

    return <Modal isOpen={isOpen} closeIcon={false} onClose={() => false} >
        <Modal.Layout>
            <Modal.Head>
                <Modal.Title>Формирование архива</Modal.Title>
            </Modal.Head>
            <Modal.Body>
                <Groups justifyContent="center">
                    <Spinner size="xxl" />
                </Groups>
            </Modal.Body>
            <Modal.Footer>
            </Modal.Footer>
        </Modal.Layout>
    </Modal>
}